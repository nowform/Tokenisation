var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry:  './src/js/app.js',
    output: {
        path: path.resolve(__dirname,'build'),
        filename: 'bundle.min.js',
        // publicPath: '/build'
    },
    module:{
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [ 
                    devMode ? 'style-loader': MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                  ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader:'babel-loader',
                        options: {
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            name:'[name].[ext]'
                        }
                    }
                ],
                exclude: path.resolve(__dirname, 'src/index.html')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss : [ 
                    autoprefixer()
                ]
            }
        })
        
    ]
}