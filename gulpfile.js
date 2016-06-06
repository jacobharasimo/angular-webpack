'use strict';
var gulp = require('gulp'),
    gutil = require("gulp-util"),
    webpack = require('webpack'),
    del = require('del'),
    webpackConfig;

gulp.task("build", function (callback) {
    webpackConfig = require('./webpack.dist.config.js');
    // run webpack
    webpack(webpackConfig , function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("serve", function (callback) {
    // run webpack
    webpackConfig = require('./webpack.config.js');
    webpack(config, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('clean', function () {
    return del('dist');
});

gulp.task('default', ['build']);