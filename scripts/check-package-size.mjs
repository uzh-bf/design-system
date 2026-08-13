import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sizeChecks from "../.size-limit.cjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.resolve(root, "packages/design-system/dist");
const sizeConfig = path.resolve(root, ".size-limit.cjs");

const requiredChecks = [
  "root Button",
  "primitives Button",
  "design-system CSS",
  "preflight CSS",
  "Calendar positive control",
  "Chart positive control",
  "Carousel positive control",
];

const positiveMinimums = {
  "Calendar positive control": 25_000,
  "Chart positive control": 25_000,
  "Carousel positive control": 13_000,
};

const markerExpectations = [
  {
    name: "root Button",
    forbidden: [
      /node_modules[\\/].*(date-fns|react-day-picker)[\\/]/,
      /node_modules[\\/].*(recharts|d3-[^\\/]+|victory-vendor)[\\/]/,
      /node_modules[\\/].*embla-carousel[\\/]/,
    ],
  },
  {
    name: "primitives Button",
    forbidden: [
      /node_modules[\\/].*(date-fns|react-day-picker)[\\/]/,
      /node_modules[\\/].*(recharts|d3-[^\\/]+|victory-vendor)[\\/]/,
      /node_modules[\\/].*embla-carousel[\\/]/,
    ],
  },
  {
    name: "Calendar positive control",
    required: [/node_modules[\\/].*(date-fns|react-day-picker)[\\/]/],
  },
  {
    name: "Chart positive control",
    required: [/node_modules[\\/].*(recharts|d3-[^\\/]+|victory-vendor)[\\/]/],
  },
  {
    name: "Carousel positive control",
    required: [/node_modules[\\/].*(embla-carousel-react|embla-carousel)[\\/]/],
  },
];

function runSizeLimit(config, extraArgs = []) {
  const stdout = execFileSync(
    "pnpm",
    ["exec", "size-limit", "--config", config, "--json", ...extraArgs],
    {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "inherit"],
    },
  );
  return JSON.parse(stdout);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function collectEmittedModuleIdentifiers(value, identifiers = []) {
  if (!value || typeof value !== "object") return identifiers;
  const emitted = value.orphan === false || value.chunks?.length > 0;
  if (emitted && typeof value.identifier === "string") {
    identifiers.push(value.identifier);
  }
  if (emitted && typeof value.name === "string") identifiers.push(value.name);
  for (const child of Object.values(value)) {
    collectEmittedModuleIdentifiers(child, identifiers);
  }
  return identifiers;
}

function resolveMarkerCase(expectation) {
  const check = sizeChecks.find(({ name }) => name === expectation.name);
  assert(check, `Missing Size Limit configuration for ${expectation.name}`);
  const imports = Object.entries(check.import ?? {});
  assert(
    imports.length === 1,
    `${expectation.name} must define exactly one import contract`,
  );
  const [[entryPath, importStatement]] = imports;
  return { ...expectation, entryPath, importStatement };
}

function runBudgetChecks() {
  const results = runSizeLimit(sizeConfig);
  const actualChecks = results.map((result) => result.name);
  assert(
    JSON.stringify(actualChecks) === JSON.stringify(requiredChecks),
    `Unexpected Size Limit checks. Expected ${requiredChecks.join(", ")}; received ${actualChecks.join(", ")}`,
  );

  for (const result of results) {
    assert(
      result.passed === true,
      `${result.name} exceeded its configured limit`,
    );
    assert(
      Number.isFinite(result.size),
      `${result.name} did not report a size`,
    );
    const minimum = positiveMinimums[result.name];
    if (minimum !== undefined) {
      assert(
        result.size >= minimum,
        `${result.name} shrank below its positive-control minimum: ${result.size} < ${minimum}`,
      );
    }
  }
}

function runMarkerChecks() {
  const temporaryRoot = mkdtempSync(
    path.join(os.tmpdir(), "design-system-size-check-"),
  );

  try {
    for (const markerCase of markerExpectations.map(resolveMarkerCase)) {
      const statsPath = path.join(
        temporaryRoot,
        `${markerCase.name.replaceAll(" ", "-").toLowerCase()}.stats.json`,
      );
      const configPath = path.join(
        temporaryRoot,
        `${markerCase.name.replaceAll(" ", "-").toLowerCase()}.cjs`,
      );
      const bundlePath = path.join(
        temporaryRoot,
        `${markerCase.name.replaceAll(" ", "-").toLowerCase()}-bundle`,
      );
      const config = [
        "const fs = require('node:fs')",
        `const statsPath = ${JSON.stringify(statsPath)}`,
        `module.exports = ${JSON.stringify([
          {
            name: markerCase.name,
            path: markerCase.entryPath,
            import: { [markerCase.entryPath]: markerCase.importStatement },
            limit: "1000 kB",
            running: false,
          },
        ])}`,
        "module.exports[0].modifyWebpackConfig = webpackConfig => ({",
        "  ...webpackConfig,",
        "  plugins: [",
        "    ...(webpackConfig.plugins ?? []),",
        "    {",
        "      apply(compiler) {",
        "        compiler.hooks.done.tap('write-size-stats', stats => {",
        "          fs.writeFileSync(statsPath, JSON.stringify(stats.toJson({ all: true })))",
        "        })",
        "      },",
        "    },",
        "  ],",
        "})",
        "",
      ].join("\n");
      writeFileSync(configPath, config);
      const result = runSizeLimit(configPath, [
        "--save-bundle",
        bundlePath,
        "--clean-dir",
      ])[0];
      assert(result?.passed === true, `${markerCase.name} bundle did not pass`);

      const moduleGraph = collectEmittedModuleIdentifiers(
        JSON.parse(readFileSync(statsPath, "utf8")),
      ).join("\n");
      for (const pattern of markerCase.forbidden ?? []) {
        assert(
          !pattern.test(moduleGraph),
          `${markerCase.name} unexpectedly resolves ${pattern}`,
        );
      }
      for (const pattern of markerCase.required ?? []) {
        assert(
          pattern.test(moduleGraph),
          `${markerCase.name} is missing resolved dependency ${pattern}`,
        );
      }
    }
  } finally {
    rmSync(temporaryRoot, { force: true, recursive: true });
  }
}

try {
  assert(
    readdirSync(dist).length > 0,
    `Missing built package output at ${path.relative(root, dist)}`,
  );
  runBudgetChecks();
  runMarkerChecks();
  console.log("Package size budgets and W3 dependency markers passed.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
