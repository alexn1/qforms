'use strict';

const path      = require('path');
const gulp      = require('gulp');

const frontend_common = require("./frontend_common");
const frontend_editor = require("./frontend_editor");
const frontend_home   = require("./frontend_home");
const frontend_viewer = require("./frontend_viewer");

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function frontend_root() {
    return gulp.src(path.join(SRC_PATH, 'frontend/*.*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend')));
}

const frontend = gulp.series(frontend_common, frontend_editor, frontend_home, frontend_viewer, frontend_root);

module.exports = frontend;