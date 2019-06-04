var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname,'build'),
        filename: 'bundle.js',
        publicPath: '/build'
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
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
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