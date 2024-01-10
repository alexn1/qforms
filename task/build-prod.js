const Lib = require('./core/Lib');

main();

async function main() {
    await Lib.exec('npm run clean');
    await Promise.all([back(), front()]);
}

async function back() {
    /* await Lib.exec('webpack --config webpack.config.back.index.js');
    await Lib.exec('webpack --config webpack.config.back.start.js'); */
    await Promise.all([
        Lib.exec('webpack --config webpack.config.back.index.js'),
        Lib.exec('webpack --config webpack.config.back.start.js'),
    ]);
}

async function front() {
    /* await Lib.exec('webpack --config webpack.config.editor.js');
    await Lib.exec('webpack --config webpack.config.index.js');
    await Lib.exec('webpack --config webpack.config.monitor.js');
    await Lib.exec('webpack --config webpack.config.viewer.js'); */
    await Promise.all([
        Lib.exec('webpack --config webpack.config.editor.js'),
        Lib.exec('webpack --config webpack.config.index.js'),
        Lib.exec('webpack --config webpack.config.monitor.js'),
        Lib.exec('webpack --config webpack.config.viewer.js'),
    ]);
}
