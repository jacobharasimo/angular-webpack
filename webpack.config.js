'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
var isProd = NODE_ENV === 'production';
var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    APP = path.resolve('./app'),
    autoprefixer = require('autoprefixer');

console.info('>> node environment is ', NODE_ENV);

module.exports = {
    context: APP,
    entry: {
        main: ['webpack/hot/dev-server', './app'],
        vendor: './core/vendor'
    },
    output: {
        publicPath: "/assets/",
        path: path.resolve(APP + '/assets/'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name].css", {allChunks: true})
    ],
    resolve: {
        extensions: ['', '.webpack.js', '.ts', '.js']
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                /*Enable typescript annotation*/
                test: /\.ts$/,
                loader: isProd ? 'ng-annotate!ts' : 'ts',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw!html-minify'
            },
            {
                test: /jquery\.js$/,
                loader: 'expose?$!expose?jQuery'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!postcss')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!postcss!sass-loader?=expanded&sourceMap=true&sourceMapContents=true')
            }
        ]
    },
    'html-minify-loader': {
        empty: true,
        dom: {
            lowerCaseAttributeNames: false
        }
    },
    postcss: [
        autoprefixer({browsers: ['last 2 versions']})
    ],
    devtool: !isProd ? 'source-map' : null
};