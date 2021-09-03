const fs = require("fs");

async function clean() {
    fs.rmdirSync('dist', { recursive: true });
    // fs.mkdirSync('dist/lib/backend', { recursive: true });
}

module.exports = clean;
