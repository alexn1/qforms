const Lib = require('./Lib');

module.exports = async () => {
    const packageJson = await Lib.getJsonFileData('package.json');
    packageJson.version = Lib.incPatch(Lib.versionWithoutDev(packageJson.version));
    await Lib.putJsonFileData('package.json', packageJson);
}
