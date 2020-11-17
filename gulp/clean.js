const del = require('del');

async function clean() {
    return del(['build']);
}

module.exports = clean;
