# Packed optional-peer and type consumers

This fixture is outside the Design System workspace and contains two separate
packed consumers, each with its own lockfile and install context:

- `root-only` installs the Design System without `react-hook-form` and imports
  the root, primitive, and CSS doors. Its lockfile cannot resolve RHF through a
  sibling consumer.
- `dedicated` installs `react-hook-form` and imports the dedicated RHF door,
  while also checking that root and RHF `FormLabel` exports remain distinct.

From the repository root, run:

```sh
sh packages/design-system/tests/rsc/packed-consumers/scripts/verify.sh
```

The script builds and packs the local package, substitutes that tarball into two
isolated copies, installs each frozen external dependency graph, compiles both
consumers (including a legacy Node-style TypeScript resolution check), and
resolves their packed runtime exports.
