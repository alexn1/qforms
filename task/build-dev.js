const Lib = require('./core/Lib');

async function main() {
    await Lib.exec('npm run clean');
    await Promise.all([back(), front()]);
}

async function back() {
    await Promise.all([
        Lib.exec('NODE_ENV=dev webpack --config webpack.config.back.index.js'),
        Lib.exec('NODE_ENV=dev webpack --config webpack.config.back.start.js'),
    ]);
}

async function front() {
    await Promise.all([
        Lib.exec('NODE_ENV=dev webpack --config webpack.config.editor.js'),
        Lib.exec('NODE_ENV=dev webpack --config webpack.config.index.js'),
        Lib.exec('NODE_ENV=dev webpack --config webpack.config.monitor.js'),
        Lib.exec('NODE_ENV=dev webpack --config webpack.config.viewer.js'),
    ]);
}

module.exports = main;
