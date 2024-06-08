import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      assets: "/src/assets",
      lib: "/src/lib",
      styles: "/src/styles"
    },
  },
  server: {
    proxy: {
      '/pixel-pushers': {
        target: 'http://localhost:3001',
      }
    }
  },
})
