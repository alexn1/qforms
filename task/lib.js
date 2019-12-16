'use strict';

const path = require('path');
const gulp = require('gulp');

const BUILD_PATH = './build';
const SRC_PATH   = "./lib";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function lib() {
    return gulp.src([
        path.join(SRC_PATH, 'qforms.js'),
        path.join(SRC_PATH, 'server.js'),
        path.join(SRC_PATH, 'www.js')
    ]).pipe(gulp.dest(path.join(BUILD_PATH, 'lib')));
}

module.exports = lib;