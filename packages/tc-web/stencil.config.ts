import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import autoprefixer from 'autoprefixer'
import tailwind, {
  setPluginConfigurationDefaults,
  tailwindHMR,
} from 'stencil-tailwind-plugin'
import tailwindcss from 'tailwindcss'
import tailwindConf from './tailwind.config.cjs'

setPluginConfigurationDefaults({
  tailwindConf,
  postcss: {
    plugins: [tailwindcss(), autoprefixer()],
  },
})

export const config: Config = {
  namespace: 'stencil-component-example',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      baseUrl: 'https://poimen.github.io/',
      dir: 'docs',
    },
  ],
  plugins: [sass(), tailwind(), tailwindHMR()],
}
