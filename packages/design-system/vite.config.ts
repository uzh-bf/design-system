import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// check if we're running in the ladle environment
const isLadle =
  process.env.LADLE === 'true' ||
  process.argv.some((arg) => arg.includes('ladle'))

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
              path.resolve(__dirname, 'src/constants.ts'),
            ],
            formats: ['es'],
          },
          rollupOptions: {
            external: ['react', 'formik'],
            output: {
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
