const Lib = require('./Lib');

module.exports = async () => {
    // package.json
    const packageJson = await Lib.getJsonFileData('package.json');
    const version = (packageJson.version = Lib.incPatch(
        Lib.versionWithoutDev(packageJson.version),
    ));
    await Lib.putJsonFileData('package.json', packageJson);
    await Lib.putJsonFileData('dist/package.json', packageJson);

    // package-lock.json
    const packageLockJson = await Lib.getJsonFileData('package-lock.json');
    packageLockJson.version = packageLockJson.packages[''].version = version;
    await Lib.putJsonFileData('package-lock.json', packageLockJson);
    await Lib.putJsonFileData('dist/package-lock.json', packageLockJson);
};
