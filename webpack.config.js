const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
    // entry: './src/main.js',
    entry: {
        main: './src/main.js',
        vendor: './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        // filename: 'bundls',
        filename: '[name].[hash:6].js',
        // filename: '[name].js',
        // publicPath: 'https://cdn.example.com/assets/[fullhash]/',
    },
    // 自动编译
    devtool: 'inline-source-map',
    // devtool: 'cheap-eval-source-map',
    devServer: {
        static: './build',
    },
    module: {
        rules: [
            // 多个loader文件都是从下往上处理，所以先css-loader，再是style-loader
            {
                test: /\.css$/, use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader', options: {
                            esModule: false,//解决背景图乱码，生成多余文件的问题
                        }
                    },
                ]
            },
            {
                test: /\.styl$/, use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader', options: {
                            esModule: false,//解决背景图乱码，生成多余文件的问题
                        }
                    },
                    { loader: 'stylus-loader' },
                ]
            },
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.png$/, use: 'file-loader' },

        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    mode: 'development'
    //多行
    // mode: 'production'//一行
};