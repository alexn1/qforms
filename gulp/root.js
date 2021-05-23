const gulp = require('gulp');

const BUILD_PATH = './build';

function root() {
    return gulp.src([
        './LICENSE',
        './package.json',
        './README.md',
    ]).pipe(gulp.dest(BUILD_PATH));
}

module.exports = root;
