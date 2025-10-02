import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import vue from '@astrojs/vue'

export default defineConfig({
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
