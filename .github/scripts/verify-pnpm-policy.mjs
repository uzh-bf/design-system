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
const POLICY = new Map([
  ["minimumReleaseAge", "20160"],
  ["minimumReleaseAgeStrict", "true"],
  ["minimumReleaseAgeIgnoreMissingTime", "false"],
  ["trustLockfile", "false"],
]);
const NON_POLICY_KEYS = new Set(["allowBuilds", "overrides", "packages"]);
const CONFIGS = [
  ["root", "pnpm-workspace.yaml"],
  [
    "next-consumer",
    "packages/design-system/tests/rsc/next-consumer/pnpm-workspace.yaml",
  ],
  [
    "packed-dedicated",
    "packages/design-system/tests/rsc/packed-consumers/consumers/dedicated/pnpm-workspace.yaml",
  ],
  [
    "packed-root-only",
    "packages/design-system/tests/rsc/packed-consumers/consumers/root-only/pnpm-workspace.yaml",
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
};

const scriptRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const oldTime = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString();
const youngTime = new Date(Date.now() - 60 * 60 * 1000).toISOString();

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

function policyErrors(text, label) {
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

  for (const [label, relativePath] of CONFIGS) {
    try {
      const workspace = await readFile(path.join(root, relativePath), "utf8");
      errors.push(...policyErrors(workspace, relativePath));
      targets.push({ label, workspace });
    } catch (error) {
      errors.push(`${relativePath}: ${error.message}`);
    }
  }
  if (errors.length > 0)
    throw new Error(
      `workspace policy is not enforceable:\n${errors.join("\n")}`,
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
        const archive = path.join(source, `${name}-${version}.tgz`);
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
        const pathname = decodeURIComponent(
          new URL(request.url, "http://registry").pathname,
        );
        const tarballMatch =
          /^\/([^/]+)\/-\/([^/]+)-(\d+\.\d+\.\d+)\.tgz$/.exec(pathname);
        if (tarballMatch) {
          const [, name, fileName, version] = tarballMatch;
          const data = tarballs.get(`${name}@${version}`);
          if (!data || fileName !== name) throw new Error("not found");
          response.setHeader("content-type", "application/octet-stream");
          response.end(data);
          return;
        }

        const name = pathname.slice(1);
        if (
          !pathname.startsWith("/") ||
          pathname.slice(2).includes("/") ||
          !PACKAGES[name]
        ) {
          throw new Error("not found");
        }
        const versions = {};
        const times = { created: oldTime };
        for (const [version, fields] of Object.entries(PACKAGES[name])) {
          const data = tarballs.get(`${name}@${version}`);
          const publishedAt =
            mode === "young" && name === "policy-leaf" && version === "1.0.1"
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
              tarball: `http://127.0.0.1:${server.address().port}/${name}/-/${name}-${version}.tgz`,
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
            ...(mode === "missing-time" ? {} : { time: times }),
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
          /MINIMUM_RELEASE_AGE|minimum.*release.*age|too young|recently published/i,
        );
      }
      console.log(
        `${target.label}: mature frozen install and direct/transitive age gates pass`,
      );
    }

    const rootTarget = targets[0];
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
