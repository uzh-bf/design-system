const { VersionConfigTypes } = require('./packages/design-system/src/constants')

module.exports = {
  types: VersionConfigTypes,
  packageFiles: [
    {
      filename: `package.json`,
      type: 'json',
    },
  ],
  bumpFiles: [
    {
      filename: `package.json`,
      type: 'json',
    },
    {
      filename: `package-lock.json`,
      type: 'json',
    },
  ],
}
