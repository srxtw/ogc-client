import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@camptocamp/ogc-client/bundled': path.resolve(__dirname, 'node_modules/@camptocamp/ogc-client/dist/index.js'),
      //'@camptocamp/ogc-client': path.resolve(__dirname, 'node_modules/@camptocamp/ogc-client/dist/index.js'),
      '@rgrove/parse-xml': path.resolve(__dirname, 'node_modules/@rgrove/parse-xml/dist/index.js'),
    },
  },
  optimizeDeps: {
   // exclude: ['@camptocamp/ogc-client'],
  },
})
