#!/usr/bin/env bash
set -euo pipefail

readonly IMAGE='mcr.microsoft.com/playwright:v1.61.0-noble@sha256:111dde95859f2c659291cb60e698f9048a8fc30b35b4ddb7c90f9cb5b73062d9'
readonly PLATFORM='linux/amd64'
readonly SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly PACKAGE_DIR="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
readonly REPO_DIR="$(cd -- "${PACKAGE_DIR}/../.." && pwd)"
readonly SNAPSHOT_DIR="${PACKAGE_DIR}/visual/button-canary.spec.ts-snapshots"
readonly RESULTS_DIR="${PACKAGE_DIR}/visual/test-results"
readonly REPORT_DIR="${PACKAGE_DIR}/visual/playwright-report"

mode='compare'
case "${1:-}" in
  '')
    ;;
  --generate)
    mode='generate'
    ;;
  *)
    printf 'Usage: %s [--generate]\n' "$0" >&2
    exit 2
    ;;
esac

if [[ $# -gt 1 ]]; then
  printf 'Usage: %s [--generate]\n' "$0" >&2
  exit 2
fi

command -v docker >/dev/null 2>&1 || {
  printf 'docker is required for deterministic visual tests\n' >&2
  exit 1
}

output_dir="$(mktemp -d /tmp/design-system-vrt.XXXXXX)"
cleanup() {
  rm -rf -- "$output_dir"
}
trap cleanup EXIT

mkdir -p "${output_dir}/snapshots" "${output_dir}/results" "${output_dir}/report"

container_script='
set -euo pipefail

mode="$1"
mkdir -p /workspace
tar -xf - -C /workspace
cd /workspace

corepack enable
corepack pnpm install --frozen-lockfile
corepack pnpm --filter @uzh-bf/design-system build:ladle

cd /workspace/packages/design-system
test_status=0
if [[ "$mode" == generate ]]; then
  PWTEST_SKIP_BUILD=1 corepack pnpm exec playwright test \
    --config=playwright.visual.config.ts \
    --update-snapshots || test_status=$?
else
  PWTEST_SKIP_BUILD=1 corepack pnpm exec playwright test \
    --config=playwright.visual.config.ts || test_status=$?
fi

if [[ -d visual/button-canary.spec.ts-snapshots ]]; then
  cp -a visual/button-canary.spec.ts-snapshots /output/snapshots/
fi
if [[ -d visual/test-results ]]; then
  cp -a visual/test-results/. /output/results/
fi
if [[ -d playwright-report ]]; then
  cp -a playwright-report/. /output/report/
fi

exit "$test_status"
'

set +e
COPYFILE_DISABLE=1 tar \
  --no-xattrs \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='*/node_modules' \
  --exclude='._*' \
  --exclude='*/._*' \
  --exclude='__MACOSX' \
  --exclude='packages/design-system/build' \
  --exclude='packages/design-system/dist' \
  --exclude='packages/design-system/visual/test-results' \
  --exclude='packages/design-system/visual/playwright-report' \
  --exclude='project/_local' \
  --exclude='.pnpm-store' \
  -C "$REPO_DIR" -cf - . |
  docker run \
    --rm \
    --init \
    --ipc=host \
    --platform="$PLATFORM" \
    --mount "type=bind,src=${output_dir},dst=/output" \
    -i "$IMAGE" \
    bash -lc "$container_script" -- "$mode"
docker_status=$?
set -e

if [[ -d "${output_dir}/snapshots/button-canary.spec.ts-snapshots" ]]; then
  rm -rf -- "$SNAPSHOT_DIR"
  cp -a "${output_dir}/snapshots/button-canary.spec.ts-snapshots" \
    "${PACKAGE_DIR}/visual/"
fi

if [[ -d "${output_dir}/results" ]]; then
  rm -rf -- "$RESULTS_DIR"
  mkdir -p "$RESULTS_DIR"
  cp -a "${output_dir}/results/." "$RESULTS_DIR/"
fi

if [[ -d "${output_dir}/report" ]]; then
  rm -rf -- "$REPORT_DIR"
  mkdir -p "$REPORT_DIR"
  cp -a "${output_dir}/report/." "$REPORT_DIR/"
fi

exit "$docker_status"
