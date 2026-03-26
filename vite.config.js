import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      "@": fileURLToPath(new URL('./src', import.meta.url)),
      "@components": fileURLToPath(new URL('./src/components', import.meta.url)),
      "@pages": fileURLToPath(new URL('./src/pages', import.meta.url))
    }
  }
})