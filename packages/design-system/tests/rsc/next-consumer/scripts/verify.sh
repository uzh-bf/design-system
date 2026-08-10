#!/bin/sh

set -eu

fixture_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
package_dir=$(CDPATH= cd -- "$fixture_dir/../../.." && pwd)
run_root=$(mktemp -d "${TMPDIR:-/tmp}/design-system-rsc.XXXXXX")
run_fixture="$run_root/next-consumer"
fixture_port=${RSC_FIXTURE_PORT:-4173}
server_pid=''

cleanup() {
  if test -n "$server_pid"; then
    kill "$server_pid" 2>/dev/null || true
    wait "$server_pid" 2>/dev/null || true
  fi
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

dist_dir="$package_dir/dist"
test -f "$dist_dir/index.js"
test -f "$dist_dir/primitives.js"
test -f "$dist_dir/react-hook-form.js"
test -f "$dist_dir/index.d.ts"
test -f "$dist_dir/primitives.d.ts"
test -f "$dist_dir/react-hook-form.d.ts"

if grep -Eq '^(import|export)[[:space:]].*react-hook-form' \
  "$dist_dir/index.js" "$dist_dir/index.d.ts" \
  "$dist_dir/primitives.js" "$dist_dir/primitives.d.ts"; then
  echo 'RSC contract failure: root or primitives output reaches react-hook-form' >&2
  exit 1
fi

if grep -Eq "^[[:space:]]*(['\"]use client['\"])[[:space:]]*;?" "$dist_dir/index.js"; then
  echo 'RSC contract failure: root output is classified as a client entry' >&2
  exit 1
fi

grep -Eq "^[[:space:]]*(['\"]use client['\"])[[:space:]]*;?" "$dist_dir/react-hook-form.js"
grep -Eq '^(import|export)[[:space:]].*react-hook-form' \
  "$dist_dir/react-hook-form.js" "$dist_dir/react-hook-form.d.ts"

(
  cd "$run_fixture"
  pnpm install --frozen-lockfile
  pnpm exec next build
  pnpm exec next build --webpack
)

(
  cd "$run_fixture"
  RSC_FIXTURE_PORT="$fixture_port" pnpm exec next start --hostname 127.0.0.1 --port "$fixture_port"
) >"$run_root/next-start.log" 2>&1 &
server_pid=$!

attempt=0
while ! curl --fail --silent --output /dev/null "http://127.0.0.1:$fixture_port/"; do
  attempt=$((attempt + 1))
  if test "$attempt" -ge 60; then
    cat "$run_root/next-start.log" >&2
    exit 1
  fi
  sleep 1
done

(
  cd "$run_fixture"
  RSC_FIXTURE_PORT="$fixture_port" pnpm exec playwright test
)
