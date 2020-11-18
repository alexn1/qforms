const path      = require('path');
const gulp      = require('gulp');
//const uglify    = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

function frontend_home_class_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/home/class/**/*.js'))
        .pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/js')));
}

const frontend_home = gulp.series(frontend_home_class_js);

module.exports = frontend_home;
