'use strict';
var webpack = require('webpack'),
    path = require('path');

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
        new webpack.HotModuleReplacementPlugin()
    ]
};