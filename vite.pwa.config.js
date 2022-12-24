
// https://vitejs.dev/config/

const vitePWAOptions = {
    registerType: 'prompt',
    injectRegister: 'script',
    strategies: 'generateWS',
    devOptions: {
        enabled: true
    },
    includeAssets: [
        'data/**/*.*',
        'img/**/*.*',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'apple-touch-icon.png',
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'mstile-70x70.png',
        'mstile-144x144.png',
        'mstile-150x150.png',
        'mstile-310x150.png',
        'mstile-310x310.png',
        'robots.txt',
        'safari-pinned-tab.svg'
    ],
    workbox: {
        sourcemap: false,
        clientsClaim: true,
        skipWaiting: false,
        cleanupOutdatedCaches: true,
        offlineGoogleAnalytics: false
    },
    manifest: {
        manifest_version: 1,
        version: "v1.0.0",
        id: "/",
        name: "Salary Tax Calculator",
        short_name: "Tax Calculator",
        description: "Salary Tax Calculator for multiple countries",
        theme_color: "#000000",
        background_color: "#000000",
        orientation: "portrait",
        display: "standalone",
        icons: [
            {
                src: 'android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: 'android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            }
        ]
    }
};

export {vitePWAOptions};