#!/usr/bin/env bash
set -euo pipefail

readonly IMAGE='mcr.microsoft.com/playwright:v1.61.0-noble@sha256:111dde95859f2c659291cb60e698f9048a8fc30b35b4ddb7c90f9cb5b73062d9'
readonly PLATFORM='linux/amd64'
readonly SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly PACKAGE_DIR="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
readonly REPO_DIR="$(cd -- "${PACKAGE_DIR}/../.." && pwd)"
readonly HOST_UID="$(id -u)"
readonly HOST_GID="$(id -g)"
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
shopt -s nullglob
workspace_dir='/tmp/design-system-vrt-workspace'
mkdir -p "$workspace_dir"
tar -xf - -C "$workspace_dir"
cd "$workspace_dir"

export COREPACK_HOME='/tmp/design-system-vrt-corepack'
mkdir -p /tmp/design-system-vrt-bin
corepack enable --install-directory /tmp/design-system-vrt-bin
export PATH="/tmp/design-system-vrt-bin:$PATH"
corepack pnpm install --frozen-lockfile

cd "$workspace_dir/packages/design-system"
test_status=0
if [[ "$mode" == generate ]]; then
  corepack pnpm exec playwright test \
    --config=playwright.visual.config.ts \
    --update-snapshots || test_status=$?
else
  corepack pnpm exec playwright test \
    --config=playwright.visual.config.ts || test_status=$?
fi

if [[ "$mode" == generate && "$test_status" -eq 0 ]]; then
  snapshot_dirs=(visual/*.spec.ts-snapshots)
  for snapshot_dir in "${snapshot_dirs[@]}"; do
    cp -a "$snapshot_dir" "/output/snapshots/$(basename "$snapshot_dir")"
  done
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
git -C "$REPO_DIR" ls-files --cached --others --exclude-standard -z -- \
  ':(exclude)**/.env' \
  ':(exclude)**/.env.*' \
  ':(exclude)**/*.env' \
  ':(exclude)**/.npmrc' \
  ':(exclude)**/.netrc' \
  ':(exclude)**/*credentials*' \
  ':(exclude)**/*secret*' \
  ':(exclude)**/*.pem' \
  ':(exclude)**/*.key' \
  ':(exclude)**/*.p12' \
  ':(exclude)**/*.pfx' \
  ':(exclude)**/.pnpm-store/**' \
  ':(exclude)**/node_modules/**' \
  ':(exclude)**/build/**' \
  ':(exclude)**/dist/**' \
  ':(exclude)**/test-results/**' \
  ':(exclude)**/playwright-report/**' \
  ':(exclude)project/_local/**' |
  COPYFILE_DISABLE=1 tar -C "$REPO_DIR" --no-xattrs --null --files-from=- -cf - |
  docker run \
    --rm \
    --init \
    --ipc=host \
    --platform="$PLATFORM" \
    --user "${HOST_UID}:${HOST_GID}" \
    --env COREPACK_HOME=/tmp/design-system-vrt-corepack \
    --mount "type=bind,src=${output_dir},dst=/output" \
    -i "$IMAGE" \
    bash -lc "$container_script" -- "$mode"
docker_status=$?
set -e

replace_snapshots_transactionally() (
  set -euo pipefail

  local staging_dir
  local backup_dir
  local snapshot_dir
  local snapshot_name
  local -a backed_up_names=()
  local -a installed_names=()

  staging_dir=''
  backup_dir=''

  rollback_snapshot_transaction() {
    local name
    local rollback_failed=0

    for name in "${installed_names[@]}"; do
      if [[ -e "${PACKAGE_DIR}/visual/${name}" ]] &&
        ! rm -rf -- "${PACKAGE_DIR}/visual/${name}"; then
        rollback_failed=1
      fi
    done
    for name in "${backed_up_names[@]}"; do
      if [[ -d "${backup_dir}/${name}" ]]; then
        if ! mv "${backup_dir}/${name}" "${PACKAGE_DIR}/visual/${name}"; then
          rollback_failed=1
        fi
      fi
    done

    if ((rollback_failed == 0)); then
      if [[ -n "$staging_dir" ]] && ! rm -rf -- "$staging_dir"; then
        rollback_failed=1
      fi
      if [[ -n "$backup_dir" ]] && ! rm -rf -- "$backup_dir"; then
        rollback_failed=1
      fi
    fi

    if ((rollback_failed != 0)); then
      printf 'Snapshot rollback incomplete; retained recovery data at %s\n' \
        "${backup_dir:-$staging_dir}" >&2
      return 1
    fi
  }

  staging_dir="$(mktemp -d "${PACKAGE_DIR}/visual/.visual-snapshots.XXXXXX")"
  trap rollback_snapshot_transaction EXIT
  trap 'exit 129' HUP
  trap 'exit 130' INT
  trap 'exit 143' TERM

  backup_dir="$(mktemp -d "${PACKAGE_DIR}/visual/.visual-backups.XXXXXX")"

  snapshot_dirs=("${output_dir}"/snapshots/*.spec.ts-snapshots)
  if [[ ${#snapshot_dirs[@]} -eq 0 ]]; then
    printf 'No generated snapshot directories were returned\n' >&2
    exit 1
  fi

  for snapshot_dir in "${snapshot_dirs[@]}"; do
    snapshot_name="$(basename "$snapshot_dir")"
    [[ -d "$snapshot_dir" ]]
    cp -a "$snapshot_dir" "$staging_dir/$snapshot_name"
    [[ -d "$staging_dir/$snapshot_name" ]]
  done

  for snapshot_dir in "$staging_dir"/*.spec.ts-snapshots; do
    snapshot_name="$(basename "$snapshot_dir")"
    if [[ -d "${PACKAGE_DIR}/visual/${snapshot_name}" ]]; then
      backed_up_names+=("$snapshot_name")
      mv "${PACKAGE_DIR}/visual/${snapshot_name}" "$backup_dir/$snapshot_name"
    fi
  done

  for snapshot_dir in "$staging_dir"/*.spec.ts-snapshots; do
    snapshot_name="$(basename "$snapshot_dir")"
    installed_names+=("$snapshot_name")
    mv "$snapshot_dir" "${PACKAGE_DIR}/visual/${snapshot_name}"
  done

  trap - EXIT
  if ! rm -rf -- "$staging_dir"; then
    printf 'Snapshot transaction committed; staging cleanup failed at %s\n' \
      "$staging_dir" >&2
    exit 1
  fi
  if ! rm -rf -- "$backup_dir"; then
    printf 'Snapshot transaction committed; recovery backup retained at %s\n' \
      "$backup_dir" >&2
    exit 1
  fi
)

shopt -s nullglob
if [[ "$mode" == generate && "$docker_status" -eq 0 ]]; then
  if ! replace_snapshots_transactionally; then
    printf 'Failed to install generated snapshots transactionally\n' >&2
    docker_status=1
  fi
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
