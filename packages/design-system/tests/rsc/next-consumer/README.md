# Packed Next App Router RSC/RHF tracer bullet

This fixture is intentionally outside the pnpm workspace. Its verification
script builds and packs the local Design System package, copies the tarball
into a temporary isolated fixture, installs this pinned dependency graph, and
then runs both Next build modes followed by the Playwright hydration check.
The fixture never resolves the Design System through a workspace alias.

From the repository root, run:

```sh
sh packages/design-system/tests/rsc/next-consumer/scripts/verify.sh
```

The script removes its temporary isolated copy when it exits. Generated Next
output, package `dist`, and dependency directories are not checked in.
