const Lib = require('./core/Lib');

main();

async function main() {
    await Lib.exec('git checkout release');
    await Lib.exec('git pull');
    await Lib.exec('npm publish', false);
    await Lib.exec('git checkout master');
}
