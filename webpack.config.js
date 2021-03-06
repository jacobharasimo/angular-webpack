'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
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
    devServer: {
        host: '127.0.0.1',
        port: '8080',
        proxy: {
            '/swagger-service-instances*': {
                target: 'http://10.10.177.26:8880',
                secure: false
            }
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        historyApiFallback: true
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
                test: /\.ts$/,
                loader: 'ng-annotate!ts',
                exclude: /node_modules/
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
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw!html-minify'
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
    devtool: 'source-map'
};
