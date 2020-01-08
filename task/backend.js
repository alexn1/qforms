'use strict';

const path = require('path');
const gulp = require('gulp');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function backend() {
    return gulp.src(path.join(SRC_PATH, 'backend/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend')));
}

module.exports = backend;