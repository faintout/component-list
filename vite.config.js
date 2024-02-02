import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  resolve
} from 'path'

import {sanitizeFileName } from './build/sanitizeFileName.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/component-list',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    target: ['edge90', 'chrome90', 'firefox90', 'safari15'],
    outDir: 'component-list',
    rollupOptions: {
      output: {
        sanitizeFileName
      },
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "sass:math"; @use "./src/style/otherStyle.scss" as *;' // 全局公共样式
      }
    }
  },
})