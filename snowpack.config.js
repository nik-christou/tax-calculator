/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: "/",
        src: "/src",
    },
    plugins: [
        ["@snowpack/plugin-optimize", { 
            minifyJS: true,
            minifyCSS: true,
            minifyHTML: true,
            target: "es2018",
            preloadModules: false,
            preloadCSS: false,
            preloadCSSFileName: false
        }]
    ],
    install: [
        "lit-element",
        "lit-html",
        "workbox-window",
        "@vaadin/router",
        "idb/build/esm/index.js",
        "normalize.css"
    ],
    installOptions: {
        dest: "./public/web_modules",
        clean: true,
        rollup: {
            dedupe: [
                "lit-element",
                "lit-html"
            ]
        }
    },
    buildOptions: {
        out: "dist",
        clean: true,
        sourceMaps: false
    },
    devOptions: {
        "port": 8080,
        "fallback": "index.html",
        "open": "default",
        "output": "dashboard",
        "hostname": "localhost",
        "hmr": false,
        "secure": false
    }
}