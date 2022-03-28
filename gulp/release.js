const Lib = require('./Lib');

async function release() {

    // master branch
    await Lib.exec('git checkout master');
    await Lib.exec('git pull origin master');
    await Lib.exec('git push origin master');

    // edit package.json
    const packageJson1 = await Lib.getJsonFileData('package.json');
    const releaseVersion = packageJson1.version;
    console.log('releaseVersion:', releaseVersion);
    // const releaseVersion = packageJson1.version = Lib.versionWithoutDev(packageJson1.version);
    // await Lib.putJsonFileData('package.json', packageJson1);

    // build
    let stderr = await Lib.exec('gulp build --backend');
    if (stderr) throw new Error(stderr);

    // commit
    try {
        await Lib.exec(`git commit -am "release v${releaseVersion}"`);
        await Lib.exec('git push origin master');
    } catch (err) {
        console.error(err.message);
    }

    // release branch
    await Lib.exec('git checkout release');
    await Lib.exec('git pull origin release');
    await Lib.exec('git merge master');
    await Lib.exec(`git tag -am v${releaseVersion} "v${releaseVersion}"`);
    await Lib.exec('git push origin release');
    await Lib.exec('git push origin --tags');

    // master branch
    await Lib.exec('git checkout master');

    // edit package.json
    /*const packageJson2 = await Lib.getJsonFileData('package.json');
    const nextVersion = packageJson2.version = Lib.versionWithDev(Lib.incPatch(packageJson2.version));
    await Lib.putJsonFileData('package.json', packageJson2);*/

    // build
    /*stderr = await Lib.exec('gulp build --backend');
    if (stderr) throw new Error(stderr);*/

    // commit
    /*await Lib.exec(`git commit -am "begin v${Lib.versionWithoutDev(nextVersion)}"`);
    await Lib.exec('git push origin master');*/
}

module.exports = release;
