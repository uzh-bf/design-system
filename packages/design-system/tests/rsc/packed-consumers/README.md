# Packed optional-peer and type consumers

This fixture is outside the Design System workspace and contains two separate
packed consumers:

- `root-only` installs the Design System without `react-hook-form` and imports
  the root, primitive, and CSS doors.
- `dedicated` installs `react-hook-form` and imports the dedicated RHF door,
  while also checking that root and RHF `FormLabel` exports remain distinct.

From the repository root, run:

```sh
sh packages/design-system/tests/rsc/packed-consumers/scripts/verify.sh
```

The script builds and packs the local package, substitutes that tarball into an
isolated copy, installs the frozen external dependency graph, compiles both
consumers, and resolves their packed runtime exports.
