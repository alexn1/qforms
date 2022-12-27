const Lib = require('./Lib');

// "docker-build": "docker build -t qforms .",
// "docker-run": "docker run -p 3000:3000 -v qforms-runtime:/app/runtime --rm qforms",
// "docker-run-detach": "docker run -d -p 3000:3000 -v qforms-runtime:/app/runtime --rm qforms"

module.exports = async () => {
    const packageJson = await Lib.getJsonFileData('package.json');
    await Lib.exec('tsc --build tsconfig.back.json --verbose');
    await Lib.exec('webpack --config webpack.config.index.js');
    await Lib.exec('webpack --config webpack.config.monitor.js');
    await Lib.exec('webpack --config webpack.config.editor.js');
    await Lib.exec('webpack --config webpack.config.viewer.js');
    await Lib.exec(`docker build -t qforms:latest -t qforms:${packageJson.version} .`);
};
