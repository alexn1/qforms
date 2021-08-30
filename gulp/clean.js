const del = require('del');
const fs = require("fs");

function exists(path) {
    return new Promise(resolve => {
        fs.exists(path, exists => {
            resolve(exists);
        });
    });
}

async function clean() {
    const e = await exists('dist');
    // console.log('e:', e);
    if (e) {
        return del(['dist']);
    }
}

module.exports = clean;
