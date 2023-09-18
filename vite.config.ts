import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@util': path.resolve(__dirname, './src/util'),
      '@types': path.resolve(__dirname, 'src/types')
    }
  },
  build: {
    rollupOptions: {
      external: ['./cypress/**/*', '*.cy.tsx']
    }
  }
})
