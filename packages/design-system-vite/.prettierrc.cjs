module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: [
    require('prettier-plugin-organize-imports'),
    require('prettier-plugin-tailwindcss'),
  ],
  pluginSearchDirs: false,
}
