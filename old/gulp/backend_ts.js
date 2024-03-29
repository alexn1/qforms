const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');

const SRC_PATH   = './src';
const BUILD_PATH = './dist';

const tsProject = ts.createProject('tsconfig.json');

function backend_ts() {
    return gulp.src(path.join(SRC_PATH, 'backend/**/*.ts?(x)'))
        .pipe(
            //ts(
            // tsConfig.compilerOptions
            // {
            // target: 'ES2017',
            // declaration: true,
            // esModuleInterop: true,
            // module: 'commonjs',
            // }
            // )
            tsProject()
        )
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend')));
}
module.exports = backend_ts;
