const gulp = require('gulp');
const fs = require("fs");
const path = require('path');

const BUILD_PATH = './dist';

function removeFile(filePath) {
    try {
        fs.unlinkSync(filePath);
    } catch (err) {
        console.error(err.message);
    }
}

async function root_clean() {
    removeFile(path.join(BUILD_PATH, 'LICENSE'));
    removeFile(path.join(BUILD_PATH, 'package.json'));
    removeFile(path.join(BUILD_PATH, 'README.md'));
}

function root() {
    return gulp.src([
        './LICENSE',
        './package.json',
        './package-lock.json',
        './README.md',
    ]).pipe(gulp.dest(BUILD_PATH));
}


module.exports = gulp.series(
    root_clean,
    root
);
