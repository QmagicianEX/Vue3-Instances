import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
const pathResolve = (dir: string) => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': pathResolve('./src'),
      views: pathResolve('./src/views'),
      components: pathResolve('./src/components'),
      assets: pathResolve('./src/assets')
    }
  },
  build: {
    outDir: 'dist',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1500
  },
  plugins: [vue()],
})
