const Lib = require('./Lib');

module.exports = async () => {
    await Lib.exec('npx gulp clean');
    await Lib.exec('webpack --config webpack.config.back.start.js');
    await Lib.exec('webpack --config webpack.config.back.index.js');
    await Lib.exec('webpack --config webpack.config.index.js');
    await Lib.exec('webpack --config webpack.config.monitor.js');
    await Lib.exec('webpack --config webpack.config.editor.js');
    await Lib.exec('webpack --config webpack.config.viewer.js');
};
