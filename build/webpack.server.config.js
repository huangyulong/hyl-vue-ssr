const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
    // 将entry指向应用程序的server entry文件
    entry: '../src/entry-server.js',

    // 这允许webpack以node适用方式处理动态导入
    // 并且还会在编译Vue组件时
    // 告知vue-loader 输送面向服务器代码
    target: 'node',

    // 对bundle renderer提供source map支持
    devtool: 'source-map',

    // 此处告知server bundle始用node风格到处模块
    output: {
        libraryTarget: 'commonjs2'
    },

    // 外置化应用程序以来模块，可以始用服务器构建速度更快
    // 并生成较小的bundle文件
    externals: nodeExternals({
        // 不要外置化webpack需要处理的依赖模块
        // 你可以在合理添加更多的文件类型。例如未处理*.vue原始文件
        // 你还可以将修改 global 的依赖模块列入白名单
        whitelist: /\.css$/
    }),

    // 这里是将服务器整个输出
    // 构建为档额JSON文件的插件
    // 默认文件名为vue-ssr-server-bundle.json
    plugins: [
        new VueSSRServerPlugin()
    ]
})

