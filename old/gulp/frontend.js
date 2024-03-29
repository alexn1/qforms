const path = require('path');
const gulp = require('gulp');

const frontend_common = require("./frontend_common");
const frontend_monitor = require("./frontend_monitor");
const frontend_editor = require("./frontend_editor");
const frontend_index   = require("./frontend_index");
const frontend_viewer = require("./frontend_viewer");
const fs = require("fs");

const SRC_PATH   = './src';
const BUILD_PATH = './dist';

async function frontend_clean() {
    // fs.rmdirSync(path.join('dist', 'lib/frontend'), { recursive: true });
    fs.rmSync(path.join('dist', 'lib/frontend'), { recursive: true });
}

function frontend_root() {
    return gulp.src(path.join(SRC_PATH, 'frontend/*.*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend')));
}

function frontend_lib() {
    return gulp.src(path.join(SRC_PATH, 'frontend/lib/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/lib')));
}

const frontend = gulp.series(
    frontend_clean,
    frontend_root,
    frontend_lib,
    frontend_common,
    frontend_monitor,
    frontend_index,
    frontend_editor,
    frontend_viewer,
);

module.exports = frontend;
