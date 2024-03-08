const Lib = require('./core/Lib');

main();

async function main() {
    // master branch
    await Lib.exec('git checkout -q master');
    await Lib.exec('git pull -q origin master');
    await Lib.exec('git push -q origin master');
    const releaseVersion = Lib.versionWithoutDev(await Lib.getVersion());
    await Lib.setVersion(releaseVersion);
    await Lib.exec('npm run build:prod');
    await Lib.exec('git add .');
    await Lib.exec(`git commit -q -am "release v${releaseVersion}"`);
    await Lib.exec('git push -q origin master');
    await Lib.exec(`git tag -a v${releaseVersion} -m "v${releaseVersion}"`);
    await Lib.exec('git push -q origin --tags');

    // release branch
    await Lib.exec('git checkout -q release');
    await Lib.exec('git pull -q origin release');
    await Lib.exec('git merge -q master');
    await Lib.exec('git push -q origin release');

    // master branch
    await Lib.exec('git checkout -q master');
    const nextVersion = Lib.versionWithDev(Lib.incMinor(releaseVersion));
    await Lib.setVersion(nextVersion);
    await Lib.exec('npm run build');
    await Lib.exec('git add .');
    await Lib.exec(`git commit -q -am "bump version to ${nextVersion}"`);
    await Lib.exec('git push -q origin master');
}
