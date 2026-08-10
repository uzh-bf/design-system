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

mkdir -p "$run_fixture/.artifacts"
cp -R "$fixture_dir/." "$run_fixture/"

pnpm --dir "$package_dir" build
pnpm --dir "$package_dir" pack --pack-destination "$run_fixture/.artifacts" >/dev/null
packed_tarball=$(find "$run_fixture/.artifacts" -maxdepth 1 -type f -name '*.tgz' -print -quit)
test -n "$packed_tarball"
mv "$packed_tarball" "$run_fixture/.artifacts/design-system.tgz"

(
  cd "$run_fixture"
  pnpm install --frozen-lockfile
  pnpm --filter root-only exec tsc -p tsconfig.json
  pnpm --filter dedicated exec tsc -p tsconfig.json
  test ! -e "$run_fixture/consumers/root-only/node_modules/react-hook-form"
  (
    cd consumers/root-only
    node --input-type=module -e "const root = await import('@uzh-bf/design-system'); await import('@uzh-bf/design-system/primitives'); for (const specifier of ['@uzh-bf/design-system/css', '@uzh-bf/design-system/preflight.css']) { const resolved = await import.meta.resolve(specifier); if (!resolved.endsWith('.css')) throw new Error('CSS export did not resolve: ' + specifier); } if (typeof root.Button !== 'function') throw new Error('root Button export missing');"
  )
  (
    cd consumers/dedicated
    node --input-type=module -e "const root = await import('@uzh-bf/design-system'); const rhf = await import('@uzh-bf/design-system/react-hook-form'); await import('@uzh-bf/design-system/primitives'); for (const specifier of ['@uzh-bf/design-system/css', '@uzh-bf/design-system/preflight.css']) { const resolved = await import.meta.resolve(specifier); if (!resolved.endsWith('.css')) throw new Error('CSS export did not resolve: ' + specifier); } if (root.FormLabel === rhf.FormLabel) throw new Error('root and RHF FormLabel exports are not distinct'); if (typeof rhf.RhfTextField !== 'function') throw new Error('dedicated RHF export missing');"
  )
)

echo 'packed peer, type, runtime, CSS, and migration contracts pass'
