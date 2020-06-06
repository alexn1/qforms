'use strict';

const gulp      = require('gulp');

const root     = require("./root");
// const lib      = require("./lib");
const readme   = require("./readme");
const backend  = require("./backend");
const frontend = require("./frontend");

module.exports = gulp.series(readme, root, /*lib,*/ backend, frontend);
