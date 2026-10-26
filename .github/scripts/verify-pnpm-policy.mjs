#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const EXPECTED_PNPM = "12.12.1";
const AGE_EXCLUSION_KEY = "minimumReleaseAgeExclude";
const PANELS_EXCLUSION_ENTRY = "react-resizable-panels@4.14.8";
const NEXT_VERSION = "16.4.1";
const NEXT_TRAIN_PACKAGE_NAMES = [
  "next",
  "@next/env",
  "@next/swc-darwin-x64",
  "@next/swc-darwin-arm64",
  "@next/swc-linux-x64-gnu",
  "@next/swc-linux-x64-musl",
  "@next/swc-win32-x64-msvc",
  "@next/swc-linux-arm64-gnu",
  "@next/swc-linux-arm64-musl",
  "@next/swc-win32-arm64-msvc",
];
const NEXT_TRAIN_ENTRIES = NEXT_TRAIN_PACKAGE_NAMES.map(
  (name) => `${name}@${NEXT_VERSION}`,
);
const PANELS_EXCLUSIONS = [PANELS_EXCLUSION_ENTRY];
const NEXT_CONSUMER_EXCLUSIONS = [
  PANELS_EXCLUSION_ENTRY,
  ...NEXT_TRAIN_ENTRIES,
];
const PUBLICATION_METADATA_ORIGIN = "https://registry.npmjs.org";
const POLICY = new Map([
  ["minimumReleaseAge", "20160"],
  ["minimumReleaseAgeStrict", "true"],
  ["minimumReleaseAgeIgnoreMissingTime", "false"],
  ["trustLockfile", "false"],
]);
const NON_POLICY_KEYS = new Set(["allowBuilds", "overrides", "packages"]);
const CONFIGS = [
  ["root", "pnpm-workspace.yaml", PANELS_EXCLUSIONS],
  [
    "next-consumer",
    "packages/design-system/tests/rsc/next-consumer/pnpm-workspace.yaml",
    NEXT_CONSUMER_EXCLUSIONS,
  ],
  [
    "packed-dedicated",
    "packages/design-system/tests/rsc/packed-consumers/consumers/dedicated/pnpm-workspace.yaml",
    PANELS_EXCLUSIONS,
  ],
  [
    "packed-root-only",
    "packages/design-system/tests/rsc/packed-consumers/consumers/root-only/pnpm-workspace.yaml",
    PANELS_EXCLUSIONS,
  ],
];
const PACKAGES = {
  "policy-build": {
    "1.0.0": { scripts: { postinstall: "node build.cjs" } },
  },
  "policy-leaf": {
    "1.0.0": {},
    "1.0.1": {},
  },
  "policy-parent": {
    "1.0.0": { dependencies: { "policy-leaf": "1.0.1" } },
  },
  "react-resizable-panels": {
    "4.14.7": {},
    "4.14.8": { dependencies: { "policy-leaf": "1.0.1" } },
  },
  ...Object.fromEntries(
    NEXT_TRAIN_PACKAGE_NAMES.map((name) => [
      name,
      {
        "16.4.0": {},
        [NEXT_VERSION]: {},
      },
    ]),
  ),
};

const scriptRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const oldTime = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString();
const youngTime = new Date(Date.now() - 60 * 60 * 1000).toISOString();
const invalidTime = "not-a-publication-time";
const futureTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
const AGE_ERROR_PATTERN =
  /MINIMUM_RELEASE_AGE|minimum.*release.*age|too young|recently published/i;

function isYoungPublication(name, version, currentMode) {
  return (
    (currentMode === "young" &&
      name === "policy-leaf" &&
      version === "1.0.1") ||
    (currentMode === "young-exempt" &&
      name === "react-resizable-panels" &&
      version === "4.14.8") ||
    (currentMode === "young-other-panels" &&
      name === "react-resizable-panels" &&
      version === "4.14.7") ||
    (currentMode === "young-transitive" &&
      ((name === "react-resizable-panels" && version === "4.14.8") ||
        (name === "policy-leaf" && version === "1.0.1"))) ||
    (currentMode === "young-next-train" &&
      NEXT_TRAIN_PACKAGE_NAMES.includes(name) &&
      version === NEXT_VERSION) ||
    (currentMode === "young-other-next" &&
      NEXT_TRAIN_PACKAGE_NAMES.includes(name) &&
      version === "16.4.0") ||
    (currentMode === "young-next-transitive" &&
      ((NEXT_TRAIN_PACKAGE_NAMES.includes(name) && version === NEXT_VERSION) ||
        (name === "policy-leaf" && version === "1.0.1")))
  );
}

class UsageError extends Error {}

function parseArguments(argv) {
  let root = scriptRoot;
  let pnpm = process.env.PNPM_EXECUTABLE || "pnpm";

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help") {
      console.log(
        "Usage: verify-pnpm-policy.mjs [--root PATH] [--pnpm EXECUTABLE]",
      );
      process.exit(0);
    }
    const [flag, inlineValue] = argument.split("=", 2);
    if (flag !== "--root" && flag !== "--pnpm") {
      throw new UsageError(`unknown argument: ${argument}`);
    }
    const value = inlineValue ?? argv[++index];
    if (!value) throw new UsageError(`${flag} requires a value`);
    if (flag === "--root") root = value;
    else pnpm = value;
  }

  return { root: path.resolve(root), pnpm };
}

function normalizeExclusionEntry(rawEntry) {
  const entry = rawEntry.trim();
  if (entry.length >= 2 && entry.startsWith("'") && entry.endsWith("'")) {
    return entry.slice(1, -1).replaceAll("''", "'");
  }
  if (entry.length >= 2 && entry.startsWith('"') && entry.endsWith('"')) {
    try {
      const unquoted = JSON.parse(entry);
      if (typeof unquoted === "string") return unquoted;
    } catch {
      // Keep malformed quoting visible to the exact-entry comparison.
    }
  }
  return entry;
}

function findExclusionEntryLine(text, expectedEntry) {
  for (const line of text.split(/\r?\n/)) {
    const item = /^ +-(?: +(.*))?$/.exec(line);
    if (item && normalizeExclusionEntry(item[1] ?? "") === expectedEntry) {
      return line;
    }
  }
  return undefined;
}

function policyErrors(text, label, expectedEntries) {
  const values = new Map();
  const errors = [];

  for (const [index, line] of text.split(/\r?\n/).entries()) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    if (/^\s/.test(line)) continue;

    const match = /^([A-Za-z][A-Za-z0-9]*):(?:[ \t]*(.*))?$/.exec(line);
    if (!match) {
      errors.push(`${label}:${index + 1}: invalid top-level setting`);
      continue;
    }

    const [, key, rawValue = ""] = match;
    if (key === AGE_EXCLUSION_KEY) continue;
    if (!POLICY.has(key)) {
      if (!NON_POLICY_KEYS.has(key))
        errors.push(`${label}: unknown top-level setting ${key}`);
      continue;
    }
    if (values.has(key)) {
      errors.push(`${label}: duplicate setting ${key}`);
      continue;
    }
    const value = rawValue.trim();
    if (value !== POLICY.get(key)) {
      errors.push(
        `${label}: ${key} must be ${POLICY.get(key)}, received ${value || "a non-scalar"}`,
      );
    }
    values.set(key, value);
  }

  for (const key of POLICY.keys()) {
    if (!values.has(key)) errors.push(`${label}: missing setting ${key}`);
  }

  const lines = text.split(/\r?\n/);
  const exclusionKeys = [];
  const observedEntries = [];
  for (const [index, line] of lines.entries()) {
    if (/^\s/.test(line)) continue;
    const match = /^([A-Za-z][A-Za-z0-9]*):(?:[ \t]*(.*))?$/.exec(line);
    if (!match || match[1] !== AGE_EXCLUSION_KEY) continue;
    exclusionKeys.push(index);
    if ((match[2] ?? "").trim()) {
      errors.push(
        `${label}:${index + 1}: ${AGE_EXCLUSION_KEY} must use a block sequence`,
      );
      continue;
    }

    for (let next = index + 1; next < lines.length; next += 1) {
      const itemLine = lines[next];
      if (!itemLine.trim() || itemLine.trimStart().startsWith("#")) continue;
      if (!/^\s/.test(itemLine)) break;
      const item = /^ +-(?: +(.*))?$/.exec(itemLine);
      if (!item) {
        errors.push(
          `${label}:${next + 1}: ${AGE_EXCLUSION_KEY} must contain only block sequence entries`,
        );
        continue;
      }
      observedEntries.push(normalizeExclusionEntry(item[1] ?? ""));
    }
  }
  if (exclusionKeys.length !== 1) {
    errors.push(
      `${label}: ${AGE_EXCLUSION_KEY} must be defined exactly once, received ${exclusionKeys.length}`,
    );
  }

  const expected = new Set(expectedEntries);
  const counts = new Map();
  for (const entry of observedEntries) {
    counts.set(entry, (counts.get(entry) ?? 0) + 1);
    if (!expected.has(entry)) {
      errors.push(
        `${label}: ${AGE_EXCLUSION_KEY} has unexpected entry ${entry || "an empty entry"}`,
      );
    }
  }
  for (const entry of expected) {
    const count = counts.get(entry) ?? 0;
    if (count === 0) {
      errors.push(
        `${label}: ${AGE_EXCLUSION_KEY} is missing exact entry ${entry}`,
      );
    } else if (count > 1) {
      errors.push(
        `${label}: ${AGE_EXCLUSION_KEY} duplicates exact entry ${entry}`,
      );
    }
  }
  return errors;
}

function addMapping(text, key, entry) {
  const lines = text.replace(/\s*$/, "").split("\n");
  const index = lines.findIndex(
    (line) => line === `${key}:` || line === `${key}: {}`,
  );
  if (index === -1) return `${lines.join("\n")}\n${key}:\n  ${entry}\n`;
  lines[index] = `${key}:`;
  lines.splice(index + 1, 0, `  ${entry}`);
  return `${lines.join("\n")}\n`;
}

function yamlScalar(value) {
  return `'${value.replaceAll("'", "''")}'`;
}

function boundedOutput(output) {
  return output.trim().slice(-1600) || "(no output)";
}

async function command(
  executable,
  args,
  { cwd, timeoutMs, env = process.env },
) {
  return await new Promise((resolve, reject) => {
    const detached = process.platform !== "win32";
    const child = spawn(executable, args, {
      cwd,
      detached,
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    let timedOut = false;
    const append = (chunk) => {
      output = (output + chunk.toString()).slice(-16000);
    };
    child.stdout.on("data", append);
    child.stderr.on("data", append);

    const terminate = (signal) => {
      try {
        if (detached) process.kill(-child.pid, signal);
        else child.kill(signal);
      } catch {
        // The process may have exited between the timeout and this signal.
      }
    };
    const timer = setTimeout(() => {
      timedOut = true;
      terminate("SIGTERM");
      setTimeout(() => terminate("SIGKILL"), 1000).unref();
    }, timeoutMs);

    child.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.once("close", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal, timedOut, output });
    });
  });
}

function commandFailure(label, result) {
  const status = result.timedOut
    ? "timed out"
    : `exited ${result.code ?? result.signal}`;
  return new Error(`${label} ${status}:\n${boundedOutput(result.output)}`);
}

function assertSuccess(label, result) {
  if (result.timedOut || result.code !== 0) throw commandFailure(label, result);
}

function assertRejected(label, result, pattern) {
  if (result.timedOut || result.code === 0 || !pattern.test(result.output)) {
    throw commandFailure(
      `${label} did not fail with the expected policy error`,
      result,
    );
  }
}

async function assertRejectedError(label, operation, pattern) {
  try {
    await operation();
  } catch (error) {
    if (pattern.test(error.message)) return;
    throw new Error(
      `${label} failed with an unexpected error: ${boundedOutput(error.message)}`,
    );
  }
  throw new Error(`${label} did not fail with the expected policy error`);
}

function assertPolicyValidationRejects(
  label,
  workspace,
  expectedEntries,
  pattern,
) {
  const errors = policyErrors(workspace, label, expectedEntries);
  if (errors.some((error) => pattern.test(error))) return;
  throw new Error(
    `${label} did not report the expected exact-exemption error: ${errors.join("; ")}`,
  );
}

async function verifyExactExemptionPublication({
  registry = PUBLICATION_METADATA_ORIGIN,
  entries = [...new Set(CONFIGS.flatMap(([, , expected]) => expected))],
} = {}) {
  const outcomes = await Promise.all(
    entries.map(async (entry) => {
      const separator = entry.lastIndexOf("@");
      const name = entry.slice(0, separator);
      const version = entry.slice(separator + 1);
      let response;
      try {
        response = await fetch(
          `${registry.replace(/\/$/, "")}/${encodeURIComponent(name)}`,
          {
            headers: { accept: "application/json" },
            signal: AbortSignal.timeout(10000),
          },
        );
      } catch (error) {
        return `cannot fetch publication metadata for ${entry}: ${boundedOutput(error.message)}`;
      }
      if (!response.ok) {
        return `cannot fetch publication metadata for ${entry}: HTTP ${response.status}`;
      }

      let metadata;
      try {
        metadata = await response.json();
      } catch (error) {
        return `invalid publication metadata for ${entry}: ${boundedOutput(error.message)}`;
      }
      const versions = metadata?.versions;
      if (
        !versions ||
        typeof versions !== "object" ||
        !Object.hasOwn(versions, version)
      ) {
        return `publication metadata is missing ${entry}`;
      }

      const publishedAt = metadata?.time?.[version];
      const publishedTime =
        typeof publishedAt === "string" ? Date.parse(publishedAt) : Number.NaN;
      if (!Number.isFinite(publishedTime)) {
        return `publication metadata has no valid time for ${entry}`;
      }
      if (publishedTime > Date.now()) {
        return `publication metadata has a future time for ${entry}: ${publishedAt}`;
      }
      return undefined;
    }),
  );
  const errors = outcomes.filter(Boolean);
  if (errors.length > 0) {
    throw new Error(`publication metadata is invalid:\n${errors.join("\n")}`);
  }
  console.log(
    `Verified valid, non-future publication metadata for ${entries.length} exact exemptions`,
  );
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const { root, pnpm } = parseArguments(process.argv.slice(2));
  const targets = [];
  const errors = [];

  for (const [label, relativePath, expectedEntries] of CONFIGS) {
    try {
      const workspace = await readFile(path.join(root, relativePath), "utf8");
      errors.push(...policyErrors(workspace, relativePath, expectedEntries));
      targets.push({ label, workspace, expectedEntries });
    } catch (error) {
      errors.push(`${relativePath}: ${error.message}`);
    }
  }
  if (errors.length > 0)
    throw new Error(
      `workspace policy is not enforceable:\n${errors.join("\n")}`,
    );

  const nextTarget = targets.find((target) => target.label === "next-consumer");
  const rootTarget = targets.find((target) => target.label === "root");
  if (!nextTarget || !rootTarget) {
    throw new Error(
      "required root and next-consumer policy targets are missing",
    );
  }
  const nextEntryLine = findExclusionEntryLine(
    nextTarget.workspace,
    NEXT_TRAIN_ENTRIES[0],
  );
  const scopedNextEntryLine = findExclusionEntryLine(
    nextTarget.workspace,
    NEXT_TRAIN_ENTRIES[1],
  );
  if (!nextEntryLine || !scopedNextEntryLine) {
    throw new Error("validated Next exemption entries are missing");
  }
  assertPolicyValidationRejects(
    "missing Next train entry",
    nextTarget.workspace.replace(`${nextEntryLine}\n`, ""),
    nextTarget.expectedEntries,
    /missing exact entry next@16\.4\.1/,
  );
  assertPolicyValidationRejects(
    "duplicate Next train entry",
    `${nextTarget.workspace.replace(/\s*$/, "")}\n${scopedNextEntryLine}\n`,
    nextTarget.expectedEntries,
    /duplicates exact entry @next\/env@16\.4\.1/,
  );
  assertPolicyValidationRejects(
    "ranged Next train entry",
    nextTarget.workspace.replace(nextEntryLine, "  - next@^16.4.1"),
    nextTarget.expectedEntries,
    /unexpected entry next@\^16\.4\.1/,
  );
  assertPolicyValidationRejects(
    "ranged scoped Next train entry",
    nextTarget.workspace.replace(
      scopedNextEntryLine,
      "  - '@next/env@^16.4.1'",
    ),
    nextTarget.expectedEntries,
    /unexpected entry @next\/env@\^16\.4\.1/,
  );
  assertPolicyValidationRejects(
    "Next entries in root workspace",
    `${rootTarget.workspace.replace(/\s*$/, "")}\n  - next@16.4.1\n`,
    rootTarget.expectedEntries,
    /unexpected entry next@16\.4\.1/,
  );
  console.log(
    "workspace-specific exact exemption lists reject missing, duplicate, ranged, and off-workspace entries",
  );

  let version;
  try {
    const result = await command(pnpm, ["--version"], {
      cwd: root,
      timeoutMs: 10000,
    });
    assertSuccess("selected pnpm --version", result);
    version = result.output.trim();
  } catch (error) {
    throw new Error(
      `cannot inspect selected pnpm executable: ${boundedOutput(error.message)}`,
    );
  }
  if (version !== EXPECTED_PNPM) {
    throw new Error(
      `selected pnpm executable is ${version}; expected ${EXPECTED_PNPM}`,
    );
  }

  await verifyExactExemptionPublication();

  const work = await mkdtemp(path.join(tmpdir(), "design-system-pnpm-policy."));
  let server;
  let runID = 0;
  let caseID = 0;
  let mode = "old";
  const tarballs = new Map();

  try {
    const commandEnv = {
      ...process.env,
      CI: "true",
      NO_COLOR: "1",
      PNPM_HOME: path.join(work, "pnpm-home"),
      XDG_CONFIG_HOME: path.join(work, "config"),
      NPM_CONFIG_USERCONFIG: path.join(work, "empty-npmrc"),
    };
    await Promise.all([
      mkdir(commandEnv.PNPM_HOME, { recursive: true }),
      mkdir(commandEnv.XDG_CONFIG_HOME, { recursive: true }),
      writeFile(commandEnv.NPM_CONFIG_USERCONFIG, ""),
    ]);

    for (const [name, versions] of Object.entries(PACKAGES)) {
      for (const [version, fields] of Object.entries(versions)) {
        const source = path.join(work, "tar-input", name, version);
        const packageDir = path.join(source, "package");
        const archive = path.join(
          source,
          `${encodeURIComponent(name)}-${version}.tgz`,
        );
        await mkdir(packageDir, { recursive: true });
        await writeFile(
          path.join(packageDir, "package.json"),
          JSON.stringify({ name, version, ...fields }),
        );
        await writeFile(
          path.join(packageDir, "index.js"),
          "module.exports = 1\n",
        );
        await writeFile(
          path.join(packageDir, "build.cjs"),
          "require('node:fs').writeFileSync('built.marker', 'yes')\n",
        );
        const result = await command(
          "tar",
          ["-czf", archive, "-C", source, "package"],
          {
            cwd: work,
            timeoutMs: 10000,
            env: commandEnv,
          },
        );
        assertSuccess(`creating ${name}@${version} tarball`, result);
        tarballs.set(`${name}@${version}`, await readFile(archive));
      }
    }

    server = createServer((request, response) => {
      try {
        const pathname = new URL(request.url, "http://registry").pathname;
        const tarballMatch = /^\/tarballs\/([^/]+)\/(\d+\.\d+\.\d+)\.tgz$/.exec(
          pathname,
        );
        if (tarballMatch) {
          const [, encodedName, version] = tarballMatch;
          const name = decodeURIComponent(encodedName);
          const data = tarballs.get(`${name}@${version}`);
          if (!data) throw new Error("not found");
          response.setHeader("content-type", "application/octet-stream");
          response.end(data);
          return;
        }

        const name = decodeURIComponent(pathname.slice(1));
        if (!pathname.startsWith("/") || !PACKAGES[name]) {
          throw new Error("not found");
        }
        const versions = {};
        const times = { created: oldTime };
        for (const [version, fields] of Object.entries(PACKAGES[name])) {
          const data = tarballs.get(`${name}@${version}`);
          const publishedAt =
            mode === "invalid-time"
              ? invalidTime
              : mode === "future-time"
                ? futureTime
                : isYoungPublication(name, version, mode)
                  ? youngTime
                  : oldTime;
          times[version] = publishedAt;
          versions[version] = {
            name,
            version,
            ...fields,
            dist: {
              integrity: `sha512-${createHash("sha512").update(data).digest("base64")}`,
              shasum: createHash("sha1").update(data).digest("hex"),
              tarball: `http://127.0.0.1:${server.address().port}/tarballs/${encodeURIComponent(name)}/${version}.tgz`,
            },
          };
        }
        const versionNames = Object.keys(versions);
        times.modified = versionNames
          .map((version) => times[version])
          .sort()
          .at(-1);
        response.setHeader("content-type", "application/json");
        response.end(
          JSON.stringify({
            name,
            "dist-tags": { latest: versionNames.sort().at(-1) },
            versions,
            ...(mode === "missing-time" ||
            (mode === "missing-time-exempt" &&
              name === "react-resizable-panels")
              ? {}
              : { time: times }),
          }),
        );
      } catch {
        response.statusCode = 404;
        response.setHeader("content-type", "application/json");
        response.end("{}");
      }
    });
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", () => {
        server.off("error", reject);
        resolve();
      });
    });
    const registry = `http://127.0.0.1:${server.address().port}`;

    mode = "old";
    await verifyExactExemptionPublication({
      registry,
      entries: nextTarget.expectedEntries,
    });
    for (const [metadataMode, label, pattern] of [
      [
        "missing-time",
        "missing publication time for exact exemptions",
        /no valid time/,
      ],
      [
        "invalid-time",
        "invalid publication time for exact exemptions",
        /no valid time/,
      ],
      [
        "future-time",
        "future publication time for exact exemptions",
        /future time/,
      ],
    ]) {
      mode = metadataMode;
      await assertRejectedError(
        label,
        () =>
          verifyExactExemptionPublication({
            registry,
            entries: nextTarget.expectedEntries,
          }),
        pattern,
      );
    }
    mode = "old";
    console.log(
      "publication metadata controls reject missing, invalid, and future times for the Next consumer allowlist",
    );

    async function createCase(
      target,
      suffix,
      dependencies,
      transform = (text) => text,
    ) {
      const directory = path.join(
        work,
        "cases",
        `${++caseID}-${target.label}-${suffix}`,
      );
      await mkdir(directory, { recursive: true });
      await writeFile(
        path.join(directory, "package.json"),
        JSON.stringify({
          name: `pnpm-policy-${caseID}`,
          private: true,
          packageManager: `pnpm@${EXPECTED_PNPM}`,
          dependencies,
        }),
      );
      return { directory, workspace: transform(target.workspace) };
    }

    async function runPnpm(testCase, args) {
      const id = ++runID;
      const cache = path.join(work, "cache", String(id));
      const store = path.join(work, "store", String(id));
      const workspace = `${testCase.workspace.replace(/\s*$/, "")}\ncacheDir: ${yamlScalar(cache)}\nstoreDir: ${yamlScalar(store)}\n`;
      await writeFile(
        path.join(testCase.directory, "pnpm-workspace.yaml"),
        workspace,
      );
      const result = await command(pnpm, [...args, "--registry", registry], {
        cwd: testCase.directory,
        timeoutMs: 45000,
        env: commandEnv,
      });
      return result;
    }

    async function assertRejectedFreshAndFrozen(
      target,
      label,
      dependencies,
      youngMode,
    ) {
      const fresh = await createCase(target, `${label}-fresh`, dependencies);
      mode = youngMode;
      const freshResult = await runPnpm(fresh, [
        "install",
        "--lockfile-only",
        "--ignore-scripts",
      ]);
      assertRejected(
        `${target.label} ${label} fresh age gate`,
        freshResult,
        AGE_ERROR_PATTERN,
      );

      const frozen = await createCase(target, `${label}-frozen`, dependencies);
      mode = "old";
      const lockResult = await runPnpm(frozen, [
        "install",
        "--lockfile-only",
        "--ignore-scripts",
      ]);
      assertSuccess(
        `${target.label} ${label} mature lock creation`,
        lockResult,
      );
      mode = youngMode;
      const frozenResult = await runPnpm(frozen, [
        "install",
        "--frozen-lockfile",
        "--ignore-scripts",
      ]);
      assertRejected(
        `${target.label} ${label} frozen age gate`,
        frozenResult,
        AGE_ERROR_PATTERN,
      );
    }

    for (const target of targets) {
      mode = "old";
      const positive = await createCase(target, "positive", {
        "policy-leaf": "1.0.0",
      });
      let result = await runPnpm(positive, [
        "install",
        "--lockfile-only",
        "--ignore-scripts",
      ]);
      assertSuccess(`${target.label} mature lock creation`, result);
      result = await runPnpm(positive, [
        "install",
        "--frozen-lockfile",
        "--ignore-scripts",
      ]);
      assertSuccess(`${target.label} mature frozen install`, result);

      for (const [kind, dependencies] of [
        ["direct", { "policy-leaf": "1.0.1" }],
        ["transitive", { "policy-parent": "1.0.0" }],
      ]) {
        mode = "old";
        const ageCase = await createCase(target, kind, dependencies);
        result = await runPnpm(ageCase, [
          "install",
          "--lockfile-only",
          "--ignore-scripts",
        ]);
        assertSuccess(`${target.label} ${kind} age lock creation`, result);
        mode = "young";
        result = await runPnpm(ageCase, [
          "install",
          "--frozen-lockfile",
          "--ignore-scripts",
        ]);
        assertRejected(
          `${target.label} ${kind} frozen age gate`,
          result,
          AGE_ERROR_PATTERN,
        );
      }

      mode = "young-exempt";
      const exempt = await createCase(target, "young-exempt", {
        "react-resizable-panels": "4.14.8",
      });
      result = await runPnpm(exempt, [
        "install",
        "--lockfile-only",
        "--ignore-scripts",
      ]);
      assertSuccess(
        `${target.label} exact young exemption fresh install`,
        result,
      );
      result = await runPnpm(exempt, [
        "install",
        "--frozen-lockfile",
        "--ignore-scripts",
      ]);
      assertSuccess(
        `${target.label} exact young exemption frozen install`,
        result,
      );

      await assertRejectedFreshAndFrozen(
        target,
        "other-panels-version",
        { "react-resizable-panels": "4.14.7" },
        "young-other-panels",
      );
      await assertRejectedFreshAndFrozen(
        target,
        "unrelated-young",
        { "policy-leaf": "1.0.1" },
        "young",
      );
      await assertRejectedFreshAndFrozen(
        target,
        "young-under-exempt",
        { "react-resizable-panels": "4.14.8" },
        "young-transitive",
      );
      console.log(
        `${target.label}: mature, exact exemption, and direct/transitive age gates pass`,
      );
    }

    const nextTrainDependencies = Object.fromEntries(
      NEXT_TRAIN_PACKAGE_NAMES.map((name) => [name, NEXT_VERSION]),
    );
    mode = "young-next-train";
    const nextTrain = await createCase(
      nextTarget,
      "young-next-train",
      nextTrainDependencies,
    );
    let nextResult = await runPnpm(nextTrain, [
      "install",
      "--lockfile-only",
      "--ignore-scripts",
    ]);
    assertSuccess(
      "next-consumer coherent young Next train install",
      nextResult,
    );
    nextResult = await runPnpm(nextTrain, [
      "install",
      "--frozen-lockfile",
      "--ignore-scripts",
    ]);
    assertSuccess(
      "next-consumer coherent young Next train frozen install",
      nextResult,
    );

    await assertRejectedFreshAndFrozen(
      nextTarget,
      "other-next-version",
      { next: "16.4.0" },
      "young-other-next",
    );
    await assertRejectedFreshAndFrozen(
      rootTarget,
      "next-train-outside-next-consumer",
      nextTrainDependencies,
      "young-next-train",
    );
    await assertRejectedFreshAndFrozen(
      nextTarget,
      "young-transitive-with-next-train",
      { next: NEXT_VERSION, "policy-parent": "1.0.0" },
      "young-next-transitive",
    );
    console.log(
      "next-consumer: coherent Next train exemption and workspace, version, and transitive age gates pass",
    );

    mode = "missing-time";
    const missingTime = await createCase(rootTarget, "missing-time", {
      "policy-leaf": "1.0.0",
    });
    const missingTimeResult = await runPnpm(missingTime, [
      "install",
      "--lockfile-only",
      "--ignore-scripts",
    ]);
    assertRejected(
      "missing publication time gate",
      missingTimeResult,
      /MISSING_TIME|publish.*time|missing.*time/i,
    );

    mode = "missing-time-exempt";
    const missingExemptTime = await createCase(
      rootTarget,
      "missing-time-exempt",
      { "react-resizable-panels": "4.14.8" },
    );
    const missingExemptTimeResult = await runPnpm(missingExemptTime, [
      "install",
      "--lockfile-only",
      "--ignore-scripts",
    ]);
    assertRejected(
      "excluded package missing publication time gate",
      missingExemptTimeResult,
      /MISSING_TIME|publish.*time|missing.*time/i,
    );

    const unknown = await createCase(
      rootTarget,
      "unknown-setting",
      {},
      (workspace) =>
        `${workspace.replace(/\s*$/, "")}\nminimunReleaseAge: 20160\n`,
    );
    const unknownResult = await runPnpm(unknown, [
      "install",
      "--lockfile-only",
      "--ignore-scripts",
    ]);
    assertRejected(
      "unknown setting gate",
      unknownResult,
      /UNRECOGNIZED_WORKSPACE_SETTINGS|unrecognized|unknown/i,
    );

    mode = "young";
    const override = await createCase(
      rootTarget,
      "override",
      { "policy-parent": "1.0.0" },
      (workspace) => addMapping(workspace, "overrides", "policy-leaf: 1.0.0"),
    );
    const overrideResult = await runPnpm(override, [
      "install",
      "--ignore-scripts",
    ]);
    assertSuccess("existing override preservation", overrideResult);
    const installed = await readdir(
      path.join(override.directory, "node_modules", ".pnpm"),
    );
    if (!installed.some((entry) => entry.startsWith("policy-leaf@1.0.0"))) {
      throw new Error(
        "existing override did not select the mature synthetic dependency",
      );
    }

    mode = "old";
    for (const allowed of [true, false]) {
      const build = await createCase(
        rootTarget,
        `build-${allowed}`,
        { "policy-build": "1.0.0" },
        (workspace) =>
          addMapping(workspace, "allowBuilds", `policy-build: ${allowed}`),
      );
      const buildResult = await runPnpm(build, ["install"]);
      assertSuccess(`allowBuilds=${allowed}`, buildResult);
      const marker = await exists(
        path.join(
          build.directory,
          "node_modules",
          "policy-build",
          "built.marker",
        ),
      );
      if (marker !== allowed)
        throw new Error(`allowBuilds=${allowed} produced marker=${marker}`);
    }

    console.log(
      "missing-time, unknown-setting, override, and build approval controls pass",
    );
    console.log(
      "react-resizable-panels@4.14.8 missing publication time is rejected despite the exact exemption",
    );
    console.log(
      `Verified pnpm ${EXPECTED_PNPM} policy across ${targets.length} workspace configs`,
    );
  } finally {
    if (server) {
      server.closeAllConnections?.();
      await new Promise((resolve) => server.close(resolve));
    }
    await rm(work, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`pnpm policy verification failed: ${error.message}`);
  process.exitCode = error instanceof UsageError ? 2 : 1;
});
