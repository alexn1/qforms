const Lib = require('./core/Lib');
const { version } = require('../package.json');

main();

async function main() {
    await Lib.exec(`docker build -t qforms:latest -t qforms:${version} .`);
}
