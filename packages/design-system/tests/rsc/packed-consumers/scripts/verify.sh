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

node "$fixture_dir/../prepare-packed-artifact.mjs" \
  "$package_dir" \
  "$run_fixture" \
  "$run_fixture/consumers/root-only/pnpm-lock.yaml" \
  "$run_fixture/consumers/dedicated/pnpm-lock.yaml"

(
  cd "$run_fixture/consumers/root-only"
  pnpm install --frozen-lockfile
  pnpm exec tsc -p tsconfig.json
  if node --input-type=module -e "await import.meta.resolve('react-hook-form')" >/dev/null 2>&1; then
    echo 'root-only consumer unexpectedly resolves react-hook-form' >&2
    exit 1
  fi
  test ! -e node_modules/react-hook-form
  node --input-type=module -e "const root = await import('@uzh-bf/design-system'); await import('@uzh-bf/design-system/primitives'); for (const specifier of ['@uzh-bf/design-system/css', '@uzh-bf/design-system/preflight.css']) { const resolved = await import.meta.resolve(specifier); if (!resolved.endsWith('.css')) throw new Error('CSS export did not resolve: ' + specifier); } if (typeof root.Button !== 'function') throw new Error('root Button export missing');"
)

(
  cd "$run_fixture/consumers/dedicated"
  pnpm install --frozen-lockfile
  pnpm exec tsc -p tsconfig.json
  pnpm exec tsc -p tsconfig.node10.json
  node --input-type=module -e "const root = await import('@uzh-bf/design-system'); const rhf = await import('@uzh-bf/design-system/react-hook-form'); await import('@uzh-bf/design-system/primitives'); for (const specifier of ['@uzh-bf/design-system/css', '@uzh-bf/design-system/preflight.css']) { const resolved = await import.meta.resolve(specifier); if (!resolved.endsWith('.css')) throw new Error('CSS export did not resolve: ' + specifier); } if (root.FormLabel === rhf.FormLabel) throw new Error('root and RHF FormLabel exports are not distinct'); if (typeof rhf.RhfTextField !== 'function') throw new Error('dedicated RHF export missing');"
)

echo 'packed peer, type, runtime, CSS, legacy typesVersions, and migration contracts pass'
