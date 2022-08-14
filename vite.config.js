import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
import {vitePWAOptions} from "./vite.pwa.config.js";

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [
    VitePWA(vitePWAOptions)
  ]
})
