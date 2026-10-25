const Lib = require('./Lib');

async function publish() {
    // await Lib.exec('git checkout release');
    await Lib.exec('cd dist; npm publish');
    // await Lib.exec('git checkout master');
}

module.exports = publish;
