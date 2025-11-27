import fs from 'fs'
import { resolve, basename } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import injectHTML from 'vite-plugin-html-inject'
import createSvgSpritePlugin from 'vite-plugin-svg-spriter'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

const root = resolve(__dirname, './src')
const outDir = resolve(__dirname, './dist')

const pages = fs
  .readdirSync(root)
  .filter((file) => file.endsWith('.html'))
  .reduce<Record<string, string>>((obj, file) => {
    const name = basename(file, '.html')
    obj[name] = resolve(root, file)
    return obj
  }, {})

export default defineConfig({
  server: {
    host: true,
  },
  root,
  base: './',
  publicDir: '../public',
  plugins: [
    vue(),
    // vueDevTools(),
    createSvgSpritePlugin({
      svgFolder: resolve(__dirname, 'src/assets/icons'),
    }),
    injectHTML(),

    checker({
      eslint: {
        useFlatConfig: true,
        lintCommand: `eslint "${resolve(__dirname, 'src')}/**/*.{js,mjs,jsx,ts,mts,tsx,vue}"`,
      },
      stylelint: {
        lintCommand: `stylelint "${resolve(__dirname, 'src')}/**/*.{css,scss,vue}"`,
      },
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/vue/components', import.meta.url),
      ),
      '@composables': fileURLToPath(
        new URL('./src/vue/composables', import.meta.url),
      ),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
        additionalData: `@use "@/assets/scss/general/variables.scss" as *; @use "@/assets/scss/abstracts/mixins.scss" as *;`,
      },
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: pages,
      output: {
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.name?.toLowerCase() ?? 'asset'

          if (/\.(png|jpe?g|gif|webp|svg)$/.test(fileName)) {
            return 'assets/images/[name][extname]'
          }

          if (/\.(woff|woff2)$/.test(fileName)) {
            return 'assets/fonts/[name][extname]'
          }

          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(fileName)) {
            return 'assets/media/[name][extname]'
          }

          return 'assets/[name][extname]'
        },
      },
    },
  },
})
