'use strict';

const gulp = require('gulp');

const BUILD_PATH = './build';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function readme() {
    return gulp.src(['./README.md', './LICENSE'])
        .pipe(gulp.dest(BUILD_PATH));
}

module.exports = readme;