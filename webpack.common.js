const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack')

module.exports = {
    entry: './src/client/index.js',
    devtool: 'source-map',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new ImageminPlugin({
            bail: false,
            cache: false,
            imageminOptions: {
                plugins: [
                    ['pngquant', {quality: [0.5, 0.6]}]
                ]
            }
        })
    ]
}