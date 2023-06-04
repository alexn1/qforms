const Lib = require('./Lib');

async function getVersion() {
    return (await Lib.getJsonFileData('package.json')).version;
}

async function makeReleaseCommit(releaseVersion) {
    await Lib.exec(`git commit -am "release v${releaseVersion}"`);
    await Lib.exec('git push origin master');
}

async function bumpVersion() {
    const package = await Lib.getJsonFileData('package.json');
    const nextVersion = Lib.incMinor(package.version);
    package.version = nextVersion;
    await Lib.putJsonFileData('package.json', package);
    return nextVersion;
}

async function gitCheckoutMaster() {
    try {
        await Lib.exec('git checkout master');
    } catch (err) {
        if (err.message !== `Already on 'master'\n`) throw err;
    }
}

async function gitPullOriginMaster() {
    try {
        await Lib.exec('git pull origin master');
    } catch (err) {
        if (err.message !== `Already up to date.\n`) throw err;
    }
}

async function release() {
    await gitCheckoutMaster();
    await gitPullOriginMaster();
    await Lib.exec('git push origin master');

    const releaseVersion = await getVersion();
    console.log('releaseVersion:', releaseVersion);

    // await Lib.exec('npx gulp build-dev');
    // await makeReleaseCommit(releaseVersion);

    // release branch
    await Lib.exec('git checkout release');
    await Lib.exec('git pull origin release');
    await Lib.exec('git merge master');
    await Lib.exec(`git tag -am v${releaseVersion} "v${releaseVersion}"`);
    await Lib.exec('git push origin release');
    await Lib.exec('git push origin --tags');

    // master branch
    await Lib.exec('git checkout master');
    const nextVersion = await bumpVersion();
    // await buildBackend();
    await Lib.exec(`git commit -am "bump version to ${nextVersion}"`);
    await Lib.exec('git push origin master');
}

module.exports = release;
