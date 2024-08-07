/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: [
    import('prettier-plugin-organize-imports'),
    import('prettier-plugin-tailwindcss'),
  ],
}
