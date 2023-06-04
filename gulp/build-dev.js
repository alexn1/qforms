const Lib = require('./Lib');

module.exports = async () => {
    await Lib.exec('tsc --build tsconfig.back.json');
    await Lib.exec('NODE_ENV=development webpack --config webpack.config.index.js');
    await Lib.exec('NODE_ENV=development webpack --config webpack.config.monitor.js');
    await Lib.exec('NODE_ENV=development webpack --config webpack.config.editor.js');
    await Lib.exec('NODE_ENV=development webpack --config webpack.config.viewer.js');
};