const gulp = require('gulp');

// const clean    = require('./clean');
const root     = require("./root");
const backend  = require("./backend");
const frontend = require("./frontend");

module.exports = gulp.series(
    ...[
        // clean,
        root,
        ...(process.argv.indexOf('--backend') > -1 ? [backend] : []),
        frontend
    ]
);
