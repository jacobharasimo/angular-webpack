'use strict';
var webpack = require('webpack'),
    path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var APP = path.resolve('./app');

module.exports = {
    context: APP,
    entry: {
        app: ['webpack/hot/dev-server', './core/bootstrap.js']
    },
    output: {
        publicPath: "http://localhost:8080/" /*must specify full public path for HMR to work*/,
        path: path.resolve(APP),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("main.css",{allChunks:true})
    ],
    module:{
        loaders:[
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader','css?sourceMap!postcss!sass-loader?=expanded&sourceMap=true&sourceMapContents=true')
            }
        ]
    }
};