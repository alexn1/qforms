const gulp = require('gulp');

const clean    = require('./clean');
const root     = require("./root");
const backend  = require("./backend");
const frontend = require("./frontend");

module.exports = gulp.series(
    ...[
        ...(process.argv.indexOf('--backend_ts') > -1 ? [clean] : []),
        root,
        backend,
        frontend
    ]
);
