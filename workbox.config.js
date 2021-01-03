// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW

module.exports = {
    swDest: './dist/service-worker.js',
    cleanupOutdatedCaches: true,
    offlineGoogleAnalytics: false,
    clientsClaim: true,
    sourcemap: false,
    mode: 'production',
    cacheId: 'tax-calculator-pwa',
    navigateFallback: './index.html',
    skipWaiting: 'false',
    globDirectory: './dist',
    globPatterns: [
        'index.html',
        'src/**/*',
        'web_assets/**/*',
        'web_modules/**/*',
        '__snowpack__/**/*'
    ]
};
