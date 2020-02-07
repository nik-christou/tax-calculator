module.exports = {
  swDest: './service-worker.js',
  globDirectory: "./",
  globPatterns: [
    './index.html',
    './src/**/*',
    './web_assets/**/*',
    './web_modules/**/*'
  ],
  importScripts: ['./web_assets/workbox-v5.0.0/workbox-sw.js'],
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  directoryIndex: '.',
  mode: 'development',
  cacheId: 'tax-calculator-pwa',
  offlineGoogleAnalytics: false,
  navigateFallback: './index.html'
};