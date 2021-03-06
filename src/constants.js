const TailwindColorsUZH = {
  'uzh-blue-100': '#0028a5',
  'uzh-blue-80': '#3353b7',
  'uzh-blue-60': '#667ec9',
  'uzh-blue-40': '#99a9db',
  'uzh-blue-20': '#ccd4ed',
  'uzh-grey-100': '#a3adb7',
  'uzh-grey-80': '#b5bdc5',
  'uzh-grey-60': '#c8ced4',
  'uzh-grey-40': '#dadee2',
  'uzh-grey-20': '#edeff1',
  'uzh-red-100': '#dc6027',
  'uzh-red-80': '#e38052',
  'uzh-red-60': '#eaa07d',
  'uzh-red-40': '#f1bfa9',
  'uzh-red-20': '#f8dfd4',
  'uzh-yellow-100': '#fede00',
  'uzh-yellow-80': '#fbe651',
  'uzh-yellow-60': '#fcec7c',
  'uzh-yellow-40': '#fdf3a8',
  'uzh-yellow-20': '#fef9d3',
  'uzh-lightgreen-100': '#91c34a',
  'uzh-lightgreen-80': '#aad470',
  'uzh-lightgreen-60': '#bfdfg4',
  'uzh-lightgreen-40': '#d5e9b7',
  'uzh-lightgreen-20': '#eaf4db',
  'uzh-darkgreen-100': '#2a7f62',
  'uzh-darkgreen-80': '#569d85',
  'uzh-darkgreen-60': '#80b6a4',
  'uzh-darkgreen-40': '#abcec2',
  'uzh-darkgreen-20': '#d5e7e1',
  'uzh-turqoise-100': '#0b82a0',
  'uzh-turqoise-80': '#3c9fb6',
  'uzh-turqoise-60': '#6bb7c7',
  'uzh-turqoise-40': '#9ed0d9',
  'uzh-turqoise-20': '#cfe8ec',
}

const TailwindFonts = {
  thesans: ['TheSans', 'sans-serif'],
  kollektif: ['kollektif', 'sans-serif'],
}

const TailwindBasePlugins = {
  'tailwindcss/nesting': {},
  tailwindcss: {},
  autoprefixer: {},
}

const TailwindProdPlugins = {
  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
}

const ESLintConfig = {
  extends: ['next', 'next/core-web-vitals'],
}

const PrettierConfig = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('prettier-plugin-organize-imports'),
  ],
}

const VersionConfigTypes = [
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
]

module.exports = {
  TailwindColorsUZH,
  TailwindFonts,
  TailwindBasePlugins,
  TailwindProdPlugins,
  ESLintConfig,
  PrettierConfig,
  VersionConfigTypes,
}
