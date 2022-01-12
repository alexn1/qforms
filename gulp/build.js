const gulp = require('gulp');

// const clean    = require('./clean');
const root     = require("./root");
const backend  = require("./backend");
const frontend = require("./frontend");
const inc = require('./inc');

module.exports = gulp.series(
    ...[
        // clean,
        inc,
        root,
        ...(process.argv.indexOf('--backend') > -1 ? [backend] : []),
        frontend
    ]
);
