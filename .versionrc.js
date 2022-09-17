const { VersionConfigTypes } = require('./src/constants')

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
      filename: `package-lock.json`,
      type: 'json',
    },
  ],
}
