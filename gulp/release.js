const Lib = require('./Lib');

async function getVersion() {
    return (await Lib.getJsonFileData('package.json')).version;
}

async function setVersion(version) {
    // package.json
    const package = await Lib.getJsonFileData('package.json');
    package.version = version;
    await Lib.putJsonFileData('package.json', package);

    // package-lock.json
    const packageLock = await Lib.getJsonFileData('package-lock.json');
    packageLock.version = packageLock.packages[''].version = version;
    await Lib.putJsonFileData('package-lock.json', packageLock);
}

async function isDiff() {
    try {
        await Lib.exec('git diff --exit-code');
    } catch (err) {
        if (err.code) return true;
    }
    return false;
}

async function release() {
    // master branch
    await Lib.exec('git checkout -q master');
    await Lib.exec('git pull -q origin master');
    await Lib.exec('git push -q origin master');
    const releaseVersion = Lib.versionWithoutDev(await getVersion());
    await setVersion(releaseVersion);
    // await Lib.exec('npx gulp build-dev');
    await Lib.exec(`git commit -q -am "release v${releaseVersion}"`);
    await Lib.exec('git push -q origin master');

    // release branch
    await Lib.exec('git checkout -q release');
    await Lib.exec('git pull -q origin release');
    await Lib.exec('git merge -q master');
    await Lib.exec(`git tag -a v${releaseVersion} -m "v${releaseVersion}"`);
    await Lib.exec('git push -q origin release');
    await Lib.exec('git push -q origin --tags');

    // master branch
    await Lib.exec('git checkout -q master');
    const nextVersion = Lib.versionWithDev(Lib.incMinor(releaseVersion));
    await setVersion(nextVersion);
    await Lib.exec(`git commit -q -am "bump version to ${nextVersion}"`);
    await Lib.exec('git push -q origin master');
}

module.exports = release;
