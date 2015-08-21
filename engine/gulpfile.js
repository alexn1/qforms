'use strict';

var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var path   = require('path');

var pkg = require('./package.json');

var buildPath = path.join('../build', pkg.version);

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['root', 'backend', 'frontend'], function(callback) {
    callback();
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('root', function() {
    return gulp.src(['package.json', 'qforms.js', 'server.js', 'www.js']).pipe(gulp.dest(buildPath));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('backend', function() {
    return gulp.src('backend/**/*').pipe(gulp.dest(path.join(buildPath, 'backend')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend', function() {
    return gulp.src('frontend/**/*').pipe(gulp.dest(path.join(buildPath, 'frontend')));
});