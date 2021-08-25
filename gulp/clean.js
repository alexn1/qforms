const del = require('del');

async function clean() {
    return del(['dist']);
}

module.exports = clean;
