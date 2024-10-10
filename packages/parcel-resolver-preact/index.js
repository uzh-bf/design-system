// code from https://github.com/jsedlacek/parcel2-alias-bug/commit/a30a845bf4dc46e76f7e3d44d0a0563a536854a6

const { Resolver } = require('@parcel/plugin')
const NodeResolver = require('@parcel/node-resolver-core').default

const alias = {
  react: 'preact/compat',
  'react-dom/test-utils': 'preact/test-utils',
  'react-dom': 'preact/compat',
  'react/jsx-runtime': 'preact/jsx-runtime',
  'react/jsx-dev-runtime': 'preact/jsx-runtime',
}

module.exports = new Resolver({
  async resolve({ specifier, logger, dependency, options }) {
    if (Object.keys(alias).includes(specifier)) {
      const resolver = new NodeResolver({
        fs: options.inputFS,
        projectRoot: options.projectRoot,
        // Extensions are always required in URL dependencies.
        extensions:
          dependency.specifierType === 'commonjs' ||
          dependency.specifierType === 'esm'
            ? ['ts', 'tsx', 'js', 'jsx', 'json']
            : [],
        mainFields: ['source', 'browser', 'module', 'main'],
        packageManager: options.shouldAutoInstall
          ? options.packageManager
          : undefined,
        logger,
      })

      return await resolver.resolve({
        filename: alias[specifier],
        specifierType: dependency.specifierType,
        range: dependency.range,
        parent: dependency.resolveFrom,
        env: dependency.env,
        sourcePath: dependency.sourcePath,
        loc: dependency.loc,
      })
    }

    // Let the next resolver in the pipeline handle this dependency.
    return null
  },
})
