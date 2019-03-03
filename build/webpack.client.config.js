const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
    entry: '../src/entry-client.js',
    // 这将webpack运行时分离到一个引导chunk中
    // 以便可以在之后正确注入异步chunk
    // 这也为你的 应用程序vendor 代码提供了更好的缓存
    optimization: {
        splitChunks: {
            name: 'manifest',
            minChunks: Infinity
        }
    },  
    plugins: [
        // 此插件在输出目录中生成vue-ssr-client-manifest.json
        new VueSSRClientPlugin()
    ]
})

