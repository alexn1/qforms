const gulp      = require('gulp');

const clean    = require('./clean');
const readme   = require("./readme");
const root     = require("./root");
const backend  = require("./backend");
const frontend = require("./frontend");

module.exports = gulp.series(clean, readme, root, backend, frontend);
