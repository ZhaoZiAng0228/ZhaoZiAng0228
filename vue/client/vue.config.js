module.exports = {
    //...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:7001',
                pathRewrite: { '^/api': '' },
            },
        },
    },
    chainWebpack: config => {
        config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
    }
};