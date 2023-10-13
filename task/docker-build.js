const Lib = require('./core/Lib');

module.exports = async () => {
    const package = await Lib.getJsonFileData('package.json');
    await Lib.exec(`docker build -t qforms:latest -t qforms:${package.version} .`);
};
