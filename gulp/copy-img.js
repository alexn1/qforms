const path = require('path');
const gulp = require('gulp');

const SRC_PATH = './src';
const BUILD_PATH = './dist';

module.exports = () => {
    return gulp
        .src(path.join(SRC_PATH, 'frontend/favicon.ico'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'frontend')));
};
