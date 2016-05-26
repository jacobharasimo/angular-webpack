'use strict';
const NODE_ENV = process.env.NODE_ENV || 'production';

var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    _APP = path.resolve('./app'),
    _DIST = path.resolve('./dist'),
    autoprefixer = require('autoprefixer');

console.log('>> node environment is', NODE_ENV);

module.exports = {
    context: _APP,
    entry: {
        main: ['webpack/hot/dev-server', './app'],
        vendor: './core/vendor'
    },
    output: {
        path: path.resolve(_DIST + '/assets/'),
        publicPath: "/assets/",
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            //mangle: true,
            //beautify: false,
            sourceMap: true
        }),
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
                loader: 'ts',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                exclude: [/node_modules/,/index.html/],
                loader: 'raw!html-minify'
            },
            {
                test: /jquery\.js$/,
                loader: 'expose?$!expose?jQuery'
            },
            {
                test: /\.(eot(\?)?|woff|woff2|ttf|svg|png|jpg|gif)$/,
                include: /\node_modules\//,
                loader: 'url?name=[1].[ext]&limit=10000&regExp=node_modules/(.*)'
            },
            {
                test: /\.(eot(\?)?|woff|woff2|ttf|svg|png|jpg|gif)$/,
                exclude: /\node_modules\//,
                loader: 'url?name=[path][name].[ext]&limit=10000'
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
    devtool: 'hidden-source-map'
};
