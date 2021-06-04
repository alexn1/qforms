const path      = require('path');
const gulp      = require('gulp');
// const uglify    = require('gulp-uglify');
// const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";



/*function frontend_editor_class_html() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/!**!/!*.html'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/class')));
}*/

/*function frontend_editor_class_ejs() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/!**!/!*.ejs'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/class')));
}*/

function frontend_editor_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/**/*.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('editor.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/js')));
}

function frontend_editor_jsx() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/**/*.jsx'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('editor-jsx.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/js')));
}

function frontend_editor_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/**/*.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('editor.css'))
        // .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/css')));
}

const frontend_editor = gulp.series(
    frontend_editor_js,
    frontend_editor_jsx,
    frontend_editor_less,
);

module.exports = frontend_editor;
