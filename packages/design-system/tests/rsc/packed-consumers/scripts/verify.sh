#!/bin/sh

set -eu

fixture_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
package_dir=$(CDPATH= cd -- "$fixture_dir/../../.." && pwd)
run_root=$(mktemp -d "${TMPDIR:-/tmp}/design-system-packed.XXXXXX")
run_fixture="$run_root/packed-consumers"

cleanup() {
  rm -rf "$run_root"
}

trap cleanup EXIT INT TERM

mkdir -p "$run_fixture/.artifacts" "$run_fixture/consumers"
cp -R "$fixture_dir/consumers/root-only" "$run_fixture/consumers/"
cp -R "$fixture_dir/consumers/dedicated" "$run_fixture/consumers/"

rhf_version=$(node "$fixture_dir/../rhf-matrix.mjs" stage "$run_fixture/consumers/dedicated")
echo "react-hook-form matrix cell: $rhf_version"
node --test "$fixture_dir/scripts/assert-installed-dependencies.test.mjs"
node "$fixture_dir/scripts/assert-installed-dependencies.mjs" stage "$run_fixture/consumers/root-only"
node "$fixture_dir/scripts/assert-installed-dependencies.mjs" stage "$run_fixture/consumers/dedicated"

node "$fixture_dir/../prepare-packed-artifact.mjs" \
  "$package_dir" \
  "$run_fixture" \
  "$run_fixture/consumers/root-only/pnpm-lock.yaml" \
  "$run_fixture/consumers/dedicated/pnpm-lock.yaml"

(
  cd "$run_fixture/consumers/root-only"
  expected_pnpm_version=$(
    node --input-type=module -e '
      import fs from "node:fs";
      const value = JSON.parse(fs.readFileSync("package.json", "utf8")).packageManager;
      if (typeof value !== "string" || !/^pnpm@\d+\.\d+\.\d+$/.test(value)) {
        throw new Error("staged packageManager must be an exact pnpm version");
      }
      process.stdout.write(value.slice(5));
    '
  )
  actual_pnpm_version=$(pnpm --version)
  if test "$actual_pnpm_version" != "$expected_pnpm_version"; then
    echo "expected pnpm $expected_pnpm_version from staged package.json; got $actual_pnpm_version" >&2
    exit 1
  fi
  pnpm install --frozen-lockfile
  node "$fixture_dir/scripts/assert-installed-dependencies.mjs" "$run_fixture/consumers/root-only"
  pnpm exec tsc -p tsconfig.json
  if node --input-type=module -e "await import.meta.resolve('react-hook-form')" >/dev/null 2>&1; then
    echo 'root-only consumer unexpectedly resolves react-hook-form' >&2
    exit 1
  fi
  test ! -e node_modules/react-hook-form
  node --input-type=module -e "const root = await import('@uzh-bf/design-system'); const primitives = await import('@uzh-bf/design-system/primitives'); for (const name of ['ResizablePanelGroup', 'ResizablePanel', 'ResizableHandle', 'useDefaultLayout', 'useGroupRef', 'usePanelRef']) { if (root[name] !== primitives[name]) throw new Error('Resizable entries do not share identity: ' + name); } for (const specifier of ['@uzh-bf/design-system/css', '@uzh-bf/design-system/preflight.css']) { const resolved = await import.meta.resolve(specifier); if (!resolved.endsWith('.css')) throw new Error('CSS export did not resolve: ' + specifier); } if (typeof root.Button !== 'function') throw new Error('root Button export missing');"
)

(
  cd "$run_fixture/consumers/dedicated"
  expected_pnpm_version=$(
    node --input-type=module -e '
      import fs from "node:fs";
      const value = JSON.parse(fs.readFileSync("package.json", "utf8")).packageManager;
      if (typeof value !== "string" || !/^pnpm@\d+\.\d+\.\d+$/.test(value)) {
        throw new Error("staged packageManager must be an exact pnpm version");
      }
      process.stdout.write(value.slice(5));
    '
  )
  actual_pnpm_version=$(pnpm --version)
  if test "$actual_pnpm_version" != "$expected_pnpm_version"; then
    echo "expected pnpm $expected_pnpm_version from staged package.json; got $actual_pnpm_version" >&2
    exit 1
  fi
  pnpm install --frozen-lockfile
  node "$fixture_dir/../rhf-matrix.mjs" assert-installed "$run_fixture/consumers/dedicated"
  node "$fixture_dir/scripts/assert-installed-dependencies.mjs" "$run_fixture/consumers/dedicated"
  pnpm exec tsc -p tsconfig.json
  pnpm exec tsc -p tsconfig.node10.json
  node --input-type=module -e "const root = await import('@uzh-bf/design-system'); const rhf = await import('@uzh-bf/design-system/react-hook-form'); await import('@uzh-bf/design-system/primitives'); for (const specifier of ['@uzh-bf/design-system/css', '@uzh-bf/design-system/preflight.css']) { const resolved = await import.meta.resolve(specifier); if (!resolved.endsWith('.css')) throw new Error('CSS export did not resolve: ' + specifier); } if (root.FormLabel === rhf.FormLabel) throw new Error('root and RHF FormLabel exports are not distinct'); if (typeof rhf.RhfTextField !== 'function') throw new Error('dedicated RHF export missing');"
)

if test "${RHF_VERSION:-7.90.0}" = "7.90.0" && test "${RECHARTS_VERSION:-3.10.1}" = "3.10.1"; then
  npm_fixture="$run_root/npm-native-context"
  mkdir -p "$npm_fixture"
  node --input-type=module - "$run_fixture/consumers/root-only/package.json" "$npm_fixture/package.json" <<'NODE'
import fs from 'node:fs'
const manifest = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
manifest.name = 'packed-native-context'
manifest.dependencies['@uzh-bf/design-system'] = '../packed-consumers/.artifacts/design-system.tgz'
manifest.overrides = {
  'es-toolkit': '1.52.0',
  'unist-util-visit': '5.1.0',
  'unist-util-visit-parents': '6.0.2',
}
delete manifest.devDependencies
delete manifest.packageManager
fs.writeFileSync(process.argv[3], JSON.stringify(manifest))
NODE
  npm --prefix "$npm_fixture" install --ignore-scripts --no-audit --no-fund
  for native_fixture in "$run_fixture/consumers/root-only" "$npm_fixture"; do
    node --input-type=module - "$native_fixture" <<'NODE'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
const directory = process.argv[2]
const app = createRequire(path.join(directory, 'package.json'))
const manifestPath = app.resolve('@uzh-bf/design-system/package.json')
const library = createRequire(manifestPath)
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
assert.equal(app.resolve('@shadcn/react/message-scroller'), library.resolve('@shadcn/react/message-scroller'))
const { createElement: h } = await import(pathToFileURL(app.resolve('react')))
const { renderToString } = await import(pathToFileURL(app.resolve('react-dom/server')))
const native = await import(pathToFileURL(app.resolve('@shadcn/react/message-scroller')))
const root = await import(new URL(manifest.exports['.'].import, pathToFileURL(manifestPath)))
const parts = await import(new URL(manifest.exports['./primitives'].import, pathToFileURL(manifestPath)))
for (const entry of [root, parts]) {
  const html = renderToString(h(entry.ResizablePanelGroup, {
    id: 'ssr-group', 'data-testid': 'group-selector', 'data-test': 'group-test',
  },
  h(entry.ResizablePanel, {
    id: 'ssr-panel', 'data-testid': 'panel-selector', 'data-test': 'panel-test', defaultSize: '50%',
  }, 'Synthetic'),
  h(entry.ResizableHandle, {
    id: 'ssr-separator', 'data-testid': 'separator-selector', 'data-test': 'separator-test',
  }),
  h(entry.ResizablePanel, { id: 'ssr-remainder', defaultSize: '50%' }, 'Synthetic')))
  for (const kind of ['group', 'panel', 'separator']) {
    const element = html.match(new RegExp(`<div[^>]*id="ssr-${kind}"[^>]*>`))?.[0]
    assert.ok(element, `server-rendered ${kind} missing`)
    assert.ok(element.includes(`data-testid="${kind}-selector"`), `${kind} replaced caller data-testid`)
    assert.ok(element.includes(`data-test="${kind}-test"`), `${kind} replaced caller data-test`)
  }
}
assert.equal(root.useMessageScroller, parts.useMessageScroller)
assert.equal(root.useMessageScroller, native.useMessageScroller)
const message = h(root.Message, null, h(root.Bubble, null, 'Synthetic'))
const item = h(parts.MessageScrollerItem, { messageId: 'synthetic' }, message)
const content = h(parts.MessageScrollerContent, null, item)
const viewport = h(parts.MessageScrollerViewport, null, content)
const group = h(parts.MessageScroller, null, viewport)
const html = renderToString(h(native.MessageScroller.Provider, { defaultScrollPosition: 'start' }, group))
assert.match(html, /data-message-id="synthetic"/)
assert.match(html, /data-slot="bubble-content"/)
const nativeForm = await import(pathToFileURL(app.resolve('@shadcn/react/questionnaire')))
const question = h(parts.QuestionnaireItem, { name: 'format', required: true },
  h(parts.QuestionnaireTitle, null, 'Format'),
  h(parts.QuestionnaireChoices, null, h(parts.QuestionnaireChoice, { value: 'brief' }, 'Brief')))
const formHtml = renderToString(h(nativeForm.Questionnaire.Root, {
  items: [{ name: 'format', required: true, choices: [{ value: 'brief' }] }],
}, h(parts.QuestionnaireProgress), question, h(parts.QuestionnaireSubmit)))
assert.match(formHtml, /aria-valuenow="1"/)
assert.match(formHtml, /aria-valuemax="1"/)
assert.match(formHtml, /data-slot="questionnaire-choice"/)
console.log('mixed native provider and DS presentation/form SSR pass')
NODE
  done
fi

echo 'packed peer, type, runtime, CSS, legacy typesVersions, and migration contracts pass'
