const Lib = require('./Lib');

module.exports = async () => {
    const packageJson = await Lib.getJsonFileData('package.json');
    // to access host from image network on windows use host.docker.internal
    await Lib.exec(
        //`docker run -p 3000:3000 -v qforms-apps:/app/apps -v qforms-runtime:/app/runtime --rm qforms:${packageJson.version}`,
        `docker run -e LISTEN_HOST=host.docker.internal -p 3000:3000 -v qforms-apps:/app/apps -v qforms-runtime:/app/runtime --rm qforms:${packageJson.version}`,
    );
};
