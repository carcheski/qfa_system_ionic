const PROXY_CONFIG = [
    {
        context: [
            '/',
        ],
        target: "http://localhost:8080/",
        segure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/": ""
        }
    }
]

module.exports = PROXY_CONFIG;