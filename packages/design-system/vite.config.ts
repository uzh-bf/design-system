import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { readFileSync } from 'node:fs'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// check if we're running in the ladle environment
const isLadle =
  process.env.LADLE === 'true' ||
  process.argv.some((arg) => arg.includes('ladle'))

// Externalize every declared runtime dependency and its subpaths (ARCH-9/W3).
// Plain-string externals like ['react', 'formik'] did NOT cover subpaths, so
// react-dom AND react/jsx-runtime were bundled into the library chunks — a
// second react-dom copy per consumer (version-skew hazard) plus dead weight.
// Deriving the list from package.json keeps it in sync: peers are provided by
// the consumer, while regular dependencies remain package-owned runtime edges.
const pkg = JSON.parse(
  readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')
)
const runtimeDependencies = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]
const isExternal = (id: string) =>
  runtimeDependencies.some((dep) => id === dep || id.startsWith(`${dep}/`))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // only apply the dts plugin when not in a ladle build
    ...(isLadle
      ? []
      : [
          dts({
            outDir: ['dist', 'types'],
            // include: ['src/index.ts'],
            // exclude: ['src/ignore'],
            // aliasesExclude: [/^@components/],
            // staticImport: true,
            rollupTypes: true,
            // insertTypesEntry: true,
            tsconfigPath: './tsconfig.build.json',
          }),
        ]),
  ],
  ...(isLadle
    ? {}
    : {
        build: {
          lib: {
            entry: [
              path.resolve(__dirname, 'src/index.ts'),
              path.resolve(__dirname, 'src/primitives.ts'),
            ],
            formats: ['es'],
          },
          rollupOptions: {
            external: isExternal,
            output: {
              preserveModules: true,
              preserveModulesRoot: path.resolve(__dirname, 'src'),
              sourcemapExcludeSources: true,
            },
          },
          sourcemap: true,
          target: 'esnext',
          minify: false,
        },
      }),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
