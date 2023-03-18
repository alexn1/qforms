const Lib = require('./Lib');

module.exports = async () => {
    const packageJson = await Lib.getJsonFileData('package.json');
    // to access host from image network on windows use host.docker.internal
    await Lib.exec(
        `docker run -e LISTEN_HOST=0.0.0.0 -e DB_HOST=host.docker.internal -e APPS_DIR_PATH=/apps -p 7000:7000 -v qforms-apps:/app/apps -v ~/projects/qforms-apps:/apps -v qforms-runtime:/app/runtime --rm qforms:${packageJson.version}`,
    );
};
