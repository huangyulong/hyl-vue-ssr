const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// css 提取应该只用于生产环境
// 这样我们在开发过程中仍然可以热重载
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../public'),
        chunkFilename: '[name].[hash:8].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [ 'babel-loader' ],
                exclude: [path.join(__dirname, '../node_modules')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: isProduction
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader!css-loader' ]
            }
        ]
    },
    plugins: isProduction 
        ? [new ExtractTextPlugin({filename: 'common.[chunkhash].css'})]
        : []
}