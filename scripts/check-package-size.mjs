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

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.resolve(root, "packages/design-system/dist");
const sizeConfig = path.resolve(root, ".size-limit.cjs");

const expectedChecks = [
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

const markerCases = [
  {
    name: "root Button",
    file: "index.js",
    importStatement: "{ Button }",
    forbidden: [
      /date-fns|react-day-picker|@date-fns\//,
      /recharts|d3-|victory-vendor/,
      /embla-carousel/,
    ],
  },
  {
    name: "primitives Button",
    file: "primitives.js",
    importStatement: "{ Button }",
    forbidden: [
      /date-fns|react-day-picker|@date-fns\//,
      /recharts|d3-|victory-vendor/,
      /embla-carousel/,
    ],
  },
  {
    name: "Calendar positive control",
    file: "index.js",
    importStatement: "{ Calendar }",
    required: [/date-fns|react-day-picker|@date-fns\//],
  },
  {
    name: "Chart positive control",
    file: "index.js",
    importStatement: "{ ChartContainer }",
    required: [/recharts|d3-|victory-vendor/],
  },
  {
    name: "Carousel positive control",
    file: "index.js",
    importStatement: "{ Carousel }",
    // Webpack resolves Embla's package name away; assert the emitted carousel
    // controller methods instead of relying on a source-package string.
    required: [/canScroll|scrollNext|scrollPrev/],
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

function collectJavaScriptFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectJavaScriptFiles(filePath);
    return entry.name.endsWith(".js") ? [filePath] : [];
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function runBudgetChecks() {
  const results = runSizeLimit(sizeConfig);
  const actualChecks = results.map((result) => result.name);
  assert(
    JSON.stringify(actualChecks) === JSON.stringify(expectedChecks),
    `Unexpected Size Limit checks. Expected ${expectedChecks.join(", ")}; received ${actualChecks.join(", ")}`,
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
    for (const markerCase of markerCases) {
      const entryPath = path.join(dist, markerCase.file);
      const configPath = path.join(
        temporaryRoot,
        `${markerCase.name.replaceAll(" ", "-").toLowerCase()}.cjs`,
      );
      const bundlePath = path.join(
        temporaryRoot,
        `${markerCase.name.replaceAll(" ", "-").toLowerCase()}-bundle`,
      );
      const config = `module.exports = ${JSON.stringify([
        {
          name: markerCase.name,
          path: entryPath,
          import: { [entryPath]: markerCase.importStatement },
          limit: "1000 kB",
          running: false,
        },
      ])}\n`;
      writeFileSync(configPath, config);
      const result = runSizeLimit(configPath, [
        "--save-bundle",
        bundlePath,
        "--clean-dir",
      ])[0];
      assert(result?.passed === true, `${markerCase.name} bundle did not pass`);

      const javascript = collectJavaScriptFiles(bundlePath)
        .map((filePath) => readFileSync(filePath, "utf8"))
        .join("\n");
      for (const pattern of markerCase.forbidden ?? []) {
        assert(
          !pattern.test(javascript),
          `${markerCase.name} unexpectedly contains ${pattern}`,
        );
      }
      for (const pattern of markerCase.required ?? []) {
        assert(
          pattern.test(javascript),
          `${markerCase.name} is missing required marker ${pattern}`,
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
