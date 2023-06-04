const Lib = require('./Lib');

async function getVersion() {
    return (await Lib.getJsonFileData('package.json')).version;
}

async function bumpVersion() {
    const package = await Lib.getJsonFileData('package.json');
    const nextVersion = Lib.incMinor(package.version);
    package.version = nextVersion;
    await Lib.putJsonFileData('package.json', package);
    return nextVersion;
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
    const releaseVersion = await getVersion();
    // await Lib.exec('npx gulp build-dev');
    if (await isDiff()) {
        await Lib.exec(`git commit -q -am "release v${releaseVersion}"`);
        await Lib.exec('git push -q origin master');
    }

    // release branch
    await Lib.exec('git checkout -q release');
    await Lib.exec('git pull -q origin release');
    await Lib.exec('git merge -q master');
    await Lib.exec(`git tag -a v${releaseVersion} -m "v${releaseVersion}"`);
    await Lib.exec('git push -q origin release');
    await Lib.exec('git push -q origin --tags');

    // master branch
    await Lib.exec('git checkout -q master');
    const nextVersion = await bumpVersion();
    await Lib.exec(`git commit -q -am "bump version to ${nextVersion}"`);
    await Lib.exec('git push -q origin master');
}

module.exports = release;
