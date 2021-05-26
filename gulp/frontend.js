const path = require('path');
const gulp = require('gulp');

const frontend_common = require("./frontend_common");
const frontend_editor = require("./frontend_editor");
const frontend_app   = require("./frontend_app");
const frontend_viewer = require("./frontend_viewer");

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

function frontend_root() {
    return gulp.src(path.join(SRC_PATH, 'frontend/*.*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend')));
}

function frontend_lib() {
    return gulp.src(path.join(SRC_PATH, 'frontend/lib/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/lib')));
}

const frontend = gulp.series(
    frontend_root,
    frontend_lib,
    frontend_common,
    frontend_app,
    frontend_editor,
    frontend_viewer,
);

module.exports = frontend;
