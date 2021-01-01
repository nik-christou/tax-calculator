module.exports = {
    swDest: './dist/service-worker.js',
    cleanupOutdatedCaches: true,
    offlineGoogleAnalytics: false,
    clientsClaim: true,
    sourcemap: false,
    mode: 'production',
    cacheId: 'tax-calculator-pwa',
    navigateFallback: './index.html',
    globDirectory: "./dist",
    globPatterns: [
        './index.html',
        './src/**/*',
        './web_assets/**/*',
        './web_modules/**/*'
    ]
};
