module.exports = {
  types: [
    {
      type: 'feat',
      section: 'Features',
    },
    {
      type: 'enhance',
      section: 'Enhancements',
    },
    {
      type: 'fix',
      section: 'Bug Fixes',
    },
    {
      type: 'docs',
      section: 'Documentation',
    },
    {
      type: 'refactor',
      section: 'Refactors',
    },
    {
      type: 'perf',
      section: 'Performance',
    },
    {
      type: 'deploy',
      section: 'Deployment',
    },
    {
      type: 'deps',
      section: 'Dependencies',
    },
    {
      type: 'build',
      section: 'Build and CI',
    },
    {
      type: 'ci',
      section: 'Build and CI',
    },
    {
      type: 'chore',
      section: 'Other',
    },
    {
      type: 'wip',
      section: 'Other',
    },
    {
      type: 'test',
      section: 'Other',
    },
    {
      type: 'style',
      section: 'Other',
    },
  ],
  // ARCH-2: `@uzh-bf/design-system` is the only actively released package and
  // owns the version source of truth. standard-version READS the current
  // version from (`packageFiles`) and WRITES the bump to (`bumpFiles`) the
  // design-system package alone. The private monorepo root (frozen at 4.x) and
  // the 7 frozen legacy packages are intentionally excluded so a release can
  // never downgrade design-system to the root version or force-bump the legacy
  // packages. The default tag-prefix `v` keeps the `v<version>` tag convention,
  // which the CI publish guard asserts against the design-system version.
  packageFiles: [
    {
      filename: `packages/design-system/package.json`,
      type: 'json',
    },
  ],
  bumpFiles: [
    {
      filename: `packages/design-system/package.json`,
      type: 'json',
    },
  ],
}
