#!/usr/bin/env bash
# Installs the Chromium build Playwright expects, tolerating a stalled download.
#
# The observed failure is not an error exit: `playwright install` hangs mid
# download and holds the runner until the job timeout, which took the whole
# publish gate with it. A plain retry cannot help a process that never returns,
# so each attempt runs under `timeout` — that converts the hang into a failure
# the loop can act on.
set -uo pipefail

ATTEMPTS="${PLAYWRIGHT_INSTALL_ATTEMPTS:-3}"
ATTEMPT_TIMEOUT="${PLAYWRIGHT_INSTALL_TIMEOUT:-300}"
INSTALL_COMMAND=(pnpm --filter @uzh-bf/design-system test:install)

for attempt in $(seq 1 "$ATTEMPTS"); do
  # Run bare rather than as an `if` condition: a failed `if` leaves $? holding
  # the compound statement's own status, not the command's, which would erase
  # the 124 that distinguishes a stall from an ordinary failure.
  timeout "$ATTEMPT_TIMEOUT" "${INSTALL_COMMAND[@]}"
  status=$?

  if [ "$status" -eq 0 ]; then
    exit 0
  fi

  # 124 is `timeout`'s own signal that it killed the command, which is the stall
  # case; anything else is a real installer failure and is worth retrying too,
  # since the common causes (CDN 5xx, apt mirror hiccup) are transient.
  if [ "$status" -eq 124 ]; then
    reason="timed out after ${ATTEMPT_TIMEOUT}s"
  else
    reason="exited ${status}"
  fi

  if [ "$attempt" -lt "$ATTEMPTS" ]; then
    echo "::warning::Playwright browser install attempt ${attempt}/${ATTEMPTS} ${reason}; retrying"
    sleep 10
  else
    echo "::error::Playwright browser install failed after ${ATTEMPTS} attempts (last attempt ${reason})"
  fi
done

exit 1
