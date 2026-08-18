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
# Capture per-stage codes before any other command resets PIPESTATUS. The
# container verdict is docker's own exit code; under `pipefail`, `$?` would
# instead report the rightmost non-zero stage and let a producer failure
# masquerade as (or mask) a test failure.
pipe_status=("${PIPESTATUS[@]}")
set -e
docker_status="${pipe_status[2]}"
if [[ "${pipe_status[0]}" -ne 0 || "${pipe_status[1]}" -ne 0 ]]; then
  printf 'workspace archive pipeline failed (git=%s tar=%s docker=%s)\n' \
    "${pipe_status[0]}" "${pipe_status[1]}" "${pipe_status[2]}" >&2
  # An incomplete archive invalidates the container verdict; fail closed.
  if [[ "$docker_status" -eq 0 ]]; then
    docker_status=1
  fi
fi

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

  snapshot_exit_handler() {
    local status=$?

    trap - HUP INT TERM EXIT
    rollback_snapshot_transaction || status=1
    exit "$status"
  }

  snapshot_signal_handler() {
    local status="$1"

    trap - HUP INT TERM EXIT
    rollback_snapshot_transaction || status=1
    exit "$status"
  }

  local cancel_file="${output_dir}/.visual-regression-cancel"
  check_snapshot_cancellation() {
    local status=1

    if [[ ! -f "$cancel_file" ]]; then
      return 0
    fi
    if ! read -r status < "$cancel_file"; then
      status=1
    fi
    case "$status" in
      129 | 130 | 143) exit "$status" ;;
      *) exit 1 ;;
    esac
  }

  local setup_signal=''
  local setup_signal_status=0
  setup_signal_handler() {
    setup_signal="$1"
    setup_signal_status="$2"
  }

  trap snapshot_exit_handler EXIT
  trap 'setup_signal_handler HUP 129' HUP
  trap 'setup_signal_handler INT 130' INT
  trap 'setup_signal_handler TERM 143' TERM

  staging_dir="$(mktemp -d "${PACKAGE_DIR}/visual/.visual-snapshots.XXXXXX")"
  if [[ -n "$setup_signal" ]]; then
    exit "$setup_signal_status"
  fi

  backup_dir="$(mktemp -d "${PACKAGE_DIR}/visual/.visual-backups.XXXXXX")"
  if [[ -n "$setup_signal" ]]; then
    exit "$setup_signal_status"
  fi
  check_snapshot_cancellation

  trap 'snapshot_signal_handler 129' HUP
  trap 'snapshot_signal_handler 130' INT
  trap 'snapshot_signal_handler 143' TERM

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
    check_snapshot_cancellation
  done

  for snapshot_dir in "$staging_dir"/*.spec.ts-snapshots; do
    snapshot_name="$(basename "$snapshot_dir")"
    if [[ -d "${PACKAGE_DIR}/visual/${snapshot_name}" ]]; then
      backed_up_names+=("$snapshot_name")
      mv "${PACKAGE_DIR}/visual/${snapshot_name}" "$backup_dir/$snapshot_name"
      check_snapshot_cancellation
    fi
  done

  for snapshot_dir in "$staging_dir"/*.spec.ts-snapshots; do
    snapshot_name="$(basename "$snapshot_dir")"
    installed_names+=("$snapshot_name")
    mv "$snapshot_dir" "${PACKAGE_DIR}/visual/${snapshot_name}"
    check_snapshot_cancellation
  done

  check_snapshot_cancellation
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
  set +e
  transaction_pid=''
  snapshot_signal=''
  snapshot_signal_status=0
  cancel_file="${output_dir}/.visual-regression-cancel"
  snapshot_signal_handler() {
    local signal_name="$1"
    local signal_status="$2"

    snapshot_signal="$signal_name"
    snapshot_signal_status="$signal_status"
    if [[ -z "${transaction_pid:-}" ]]; then
      return 0
    fi

    trap - HUP INT TERM
    printf '%s\n' "$signal_status" > "$cancel_file"
    wait "$transaction_pid" 2>/dev/null || true
    exit "$signal_status"
  }

  trap 'snapshot_signal_handler HUP 129' HUP
  trap 'snapshot_signal_handler INT 130' INT
  trap 'snapshot_signal_handler TERM 143' TERM

  if [[ -z "$snapshot_signal" ]]; then
    replace_snapshots_transactionally &
    transaction_pid=$!
    if [[ -n "$snapshot_signal" ]]; then
      printf '%s\n' "$snapshot_signal_status" > "$cancel_file"
    fi
    wait "$transaction_pid"
    snapshot_install_status=$?
    if [[ "$snapshot_signal_status" -ne 0 ]]; then
      snapshot_install_status="$snapshot_signal_status"
    fi
  else
    snapshot_install_status="$snapshot_signal_status"
  fi

  transaction_pid=''
  trap - HUP INT TERM
  set -e
  if [[ "$snapshot_install_status" -ne 0 ]]; then
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
