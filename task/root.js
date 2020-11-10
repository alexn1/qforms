const gulp = require('gulp');

const BUILD_PATH = './build';

function root() {
    return gulp.src([
        './package.json'
    ]).pipe(gulp.dest(BUILD_PATH));
}

module.exports = root;