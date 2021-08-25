const gulp = require('gulp');

const BUILD_PATH = './dist';

function root() {
    return gulp.src([
        './LICENSE',
        './package.json',
        './README.md',
    ]).pipe(gulp.dest(BUILD_PATH));
}

module.exports = root;
