module.exports = {
  directoryIndex: '.',
  clientsClaim: true,
  swDest: './service-worker.js',
  globDirectory: '.',
  globPatterns: [
    './index.html',
    './src/**/*',
    './web_assets/**/*',
    './web_modules/**/*'
  ],
  importWorkboxFrom: 'disabled',
  importScripts: ['./web_assets/workbox-v4.3.1/workbox-sw.js'],
  cacheId: 'tax-calculator-pwa',
  offlineGoogleAnalytics: false,
  cleanupOutdatedCaches: true,
  navigateFallback: './index.html'
};
