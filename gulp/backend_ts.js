const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

function backend_ts() {
    return gulp.src(path.join(SRC_PATH, 'backend/**/*.ts'))
        .pipe(ts({
            target: 'ES2017',
            declaration: true,
            esModuleInterop: true,
            module: 'commonjs',
        }))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend')));
}
module.exports = backend_ts;
