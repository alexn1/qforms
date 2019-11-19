'use strict';

const path = require('path');
const gulp = require('gulp');

const BUILD_PATH = path.join('./build');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function readme() {
    return gulp.src(['./README.md', './LICENSE'])
        .pipe(gulp.dest(path.join(BUILD_PATH)));
}

module.exports = readme;