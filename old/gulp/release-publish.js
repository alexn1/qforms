const gulp = require('gulp');
const release = require('./release');
const publish = require('./publish');

const release_publish = gulp.series(
    release,
    publish,
);

module.exports = release_publish;
