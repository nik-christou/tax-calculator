import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

// https://vitejs.dev/config/

const vitePWAOptions = {
  registerType: 'prompt',
  strategies: 'generateWS',
  includeAssets: [
    'favicon.svg', 
    'favicon.ico', 
    'robots.txt',
    'apple-touch-icon.png',
    'fonts/roboto/*.woff',
    'fonts/roboto/*.woff2',
    'img/**/*.*',
    'normalize.css'
  ],
  workbox: {
    sourcemap: false,
    cleanupOutdatedCaches: true,
    offlineGoogleAnalytics: false
  },
  manifest: {
    manifest_version: 1,
    version: "v1.0.0",
    name: "Salary Tax Calculator",
    short_name: "Tax Calculator",
    description: "Salary Tax Calculator for multiple countries",
    theme_color: "#4e7ac7",
    orientation: "portrait",
    display: "standalone",
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      }
    ]
  }
};

export default defineConfig({
  root: '.',
  publicDir: 'public',
  preview: {
    // add certificates to test service worker locally
    https: {
      key: fs.readFileSync('./cert/localhost-key.pem'),
      cert: fs.readFileSync('./cert/localhost.pem')
    }
  },
  plugins: [
    VitePWA(vitePWAOptions)
  ]
})
