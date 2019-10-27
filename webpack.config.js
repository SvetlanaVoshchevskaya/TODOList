const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cleanWebpack = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']

            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [
        new cleanWebpack(),
        // new ExtractText({
        //         filename: 'style.css',

        //     }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new HTMLPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })

    ],
    devServer: {
        historyApiFallback: true,
        noInfo: false,
        quiet: false,
        stats: 'errors-only',
        clientLogLevel: 'warning',
        compress: true,
        port:8000,
      },

}