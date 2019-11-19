'use strict';

const path = require('path');
const gulp = require('gulp');

const BUILD_PATH = path.join('./build');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function backend() {
    return gulp.src('./lib/backend/**/*')
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend')));
}

module.exports = backend;