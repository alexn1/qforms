const path = require('path');
const gulp = require('gulp');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

function backend_ejs() {
    return gulp.src(path.join(SRC_PATH, 'backend/ejs/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend/ejs')));
}

function backend_text() {
    return gulp.src(path.join(SRC_PATH, 'backend/text/*.*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend/text')));
}

function backend_root() {
    return gulp.src(path.join(SRC_PATH, 'backend/*.*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend')));
}

function backend_viewer() {
    return gulp.src(path.join(SRC_PATH, 'backend/viewer/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend/viewer')));
}

function backend_editor() {
    return gulp.src(path.join(SRC_PATH, 'backend/editor/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend/editor')));
}

function backend_monitor() {
    return gulp.src(path.join(SRC_PATH, 'backend/monitor/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend/monitor')));
}

const backend = gulp.series(backend_ejs, backend_text, backend_root, backend_editor, backend_viewer, backend_monitor);

module.exports = backend;
