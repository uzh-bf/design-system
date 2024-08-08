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
  packageFiles: [
    {
      filename: `package.json`,
      type: 'json',
    },
  ],
  bumpFiles: [
    '',
    'packages/design-system',
    'packages/header-custom-element',
    'packages/header-react',
    'packages/tag-custom-element',
    'packages/tag-react',
    'packages/parcel-config-design-system',
    'packages/parcel-resolver-preact',
    'packages/tailwind-config-design-system',
  ].reduce((acc, path) => {
    return acc.concat({
      filename: `${path}package.json`,
      type: 'json',
    })
  }, []),
}
