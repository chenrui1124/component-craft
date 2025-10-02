import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react';
import vue from '@astrojs/vue';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), vue()],
})