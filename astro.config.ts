import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'

import react from '@astrojs/react'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { webfontDownload } from 'vite-plugin-webfont-dl'

export default defineConfig({
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwindcss(), webfontDownload()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
