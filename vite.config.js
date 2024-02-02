import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/auto-echarts',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'auto-echarts',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "sass:math"; @use "./src/style/otherStyle.scss" as *;' // 全局公共样式
      }
    }
  },
})
