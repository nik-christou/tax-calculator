module.exports = {
    port: 8080,
    watch: true,
    nodeResolve: true,
    appIndex: 'index.html',
    moduleDirs: ['node_modules', 'web_modules'],
    responseTransformers: [
        // adding a batch for chromium based browsers
        // https://bugs.chromium.org/p/chromium/issues/detail?id=946975
        async function chromiumCSSPatch({ url, status, contentType, body }) {
            if (url === '/' || url === '/index.html') {
                const patch = `
                    <script>delete Document.prototype.adoptedStyleSheets;</script>
                    </body>
                `;
                const rewritten = body.replace(`</body>`, patch);

                return { body: rewritten, contentType: contentType};
            }
        }
    ]
};
