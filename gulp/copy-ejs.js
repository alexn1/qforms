const gulp = require('gulp');
const path = require('path');

const SRC_PATH = './src';
const BUILD_PATH = './dist';

module.exports = () => {
    return gulp
        .src(path.join(SRC_PATH, 'backend/**/*.ejs'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'backend')));
};
