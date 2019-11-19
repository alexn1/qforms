'use strict';

const path = require('path');
const gulp = require('gulp');

const BUILD_PATH = path.join('./build');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function root() {
    return gulp.src([
        './package.json'
    ]).pipe(gulp.dest(BUILD_PATH));
}

module.exports = root;