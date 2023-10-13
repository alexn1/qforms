const fs = require('fs');

const DIST_PATH = 'dist';

async function clean() {
    if (fs.existsSync(DIST_PATH)) {
        fs.rmSync(DIST_PATH, { recursive: true });
    }
}

module.exports = clean;
