const fs = require("fs");

async function clean() {
    // fs.rmdirSync('dist', { recursive: true });
    fs.rmSync('dist', { recursive: true });
}

module.exports = clean;
