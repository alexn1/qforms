'use strict';

const path = require('path');
const gulp = require('gulp');

const BUILD_PATH = path.join('./build');
var LIB_PATH   = path.join(BUILD_PATH, 'lib');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function lib() {
    return gulp.src([
        './lib/qforms.js',
        './lib/server.js',
        './lib/www.js'
    ]).pipe(gulp.dest(LIB_PATH));
}

module.exports = lib;