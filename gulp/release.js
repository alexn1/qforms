const Lib = require('./Lib');
const colors = require('colors/safe');

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

async function release() {
    await Lib.exec('git checkout -q master');
    await Lib.exec('git pull -q origin master');
    await Lib.exec('git push -q origin master');

    // test 2

    const releaseVersion = await getVersion();
    // console.log('releaseVersion:', releaseVersion);

    // await Lib.exec('npx gulp build-dev');
    // await makeReleaseCommit(releaseVersion);

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
    // await buildBackend();
    await Lib.exec(`git commit -q -am "bump version to ${nextVersion}"`);
    await Lib.exec('git push -q origin master');
}

module.exports = release;
