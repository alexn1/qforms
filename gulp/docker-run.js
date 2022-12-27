const Lib = require('./Lib');

module.exports = async () => {
    const packageJson = await Lib.getJsonFileData('package.json');
    await Lib.exec(
        `docker run -p 3000:3000 -v qforms-runtime:/app/runtime --rm qforms:${packageJson.version}`,
    );
};
