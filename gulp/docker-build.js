const Lib = require('./Lib');

// "docker-build": "docker build -t qforms .",
// "docker-run": "docker run -p 7000:7000 -v qforms-runtime:/app/runtime --rm qforms",
// "docker-run-detach": "docker run -d -p 7000:7000 -v qforms-runtime:/app/runtime --rm qforms"

module.exports = async () => {
    const packageJson = await Lib.getJsonFileData('package.json');
    await Lib.exec(`docker build -t qforms:latest -t qforms:${packageJson.version} .`);
};
