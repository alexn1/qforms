const Lib = require('./core/Lib');

async function main() {
    await Lib.exec('npm run clean');
    await Lib.exec('NODE_ENV=dev webpack --config webpack.config.back.index.js');
    await Lib.exec('NODE_ENV=dev webpack --config webpack.config.back.start.js');
    await Lib.exec('NODE_ENV=dev webpack --config webpack.config.editor.js');
    await Lib.exec('NODE_ENV=dev webpack --config webpack.config.index.js');
    await Lib.exec('NODE_ENV=dev webpack --config webpack.config.monitor.js');
    await Lib.exec('NODE_ENV=dev webpack --config webpack.config.viewer.js');
}

module.exports = main;
