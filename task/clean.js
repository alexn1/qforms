const fs = require('fs');

const DIST_PATH = 'dist';

main();

async function main() {
    if (fs.existsSync(DIST_PATH)) {
        fs.rmSync(DIST_PATH, { recursive: true });
    }
}
