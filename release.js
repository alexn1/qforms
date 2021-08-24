const fs            = require('fs');
const child_process = require('child_process');

main(); async function main() {

    // master branch
    await exec('git checkout master');
    await exec('git pull origin master');
    await exec('git push origin master');
    const packageJson1 = await getJsonFileData('package.json');
    const releaseVersion = packageJson1.version = versionWithoutDev(packageJson1.version);
    await putJsonFileData('package.json', packageJson1);
    await exec(`git commit -am "release v${releaseVersion}"`);

    // release branch
    await exec('git checkout release');
    await exec('git pull origin release');
    await exec('git merge master');
    await exec(`git tag -am v${releaseVersion} "v${releaseVersion}"`);
    await exec('git push origin release');
    await exec('git push origin --tags');

    // master branch
    await exec('git checkout master');
    await exec('git push origin master');

    const packageJson2 = await getJsonFileData('package.json');
    const nextVersion = packageJson2.version = versionWithDev(incPatch(packageJson2.version));
    await putJsonFileData('package.json', packageJson2);

    await exec(`git commit -am "begin v${versionWithoutDev(nextVersion)}"`);
    await exec('git push origin master');
}

function versionWithoutDev(version) {
    const ver = version.split('.');
    const major = ver[0];
    const minor = ver[1];
    const patch = ver[2].split('-');
    return [major, minor, patch[0]].join('.');
}

function versionWithDev(version) {
    const ver = version.split('.');
    const major = ver[0];
    const minor = ver[1];
    const patch = ver[2].split('-');
    return [major, minor, [patch[0], 'dev'].join('-')].join('.');
}

function incMinor(version) {
    const ver = version.split('.');
    const major = ver[0];
    let minor = ver[1];
    const patch = ver[2];
    minor = parseInt(minor) + 1;
    return [major, minor, patch].join('.');
}

function incPatch(version) {
    const ver = version.split('.');
    const major = ver[0];
    const minor = ver[1];
    let patch = ver[2];
    patch = parseInt(patch) + 1;
    return [major, minor, patch].join('.');
}

function getJsonFileData(filePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, 'utf8', function(err, text) {
            if (err) {
                reject(err);
            } else {
                try {
                    const data = JSON.parse(text);
                    resolve(data);
                } catch(err) {
                    reject(err);
                }
            }
        });
    });
}

function putJsonFileData(filePath, data) {
    console.log('putJsonFileData version:', data.version);
    return new Promise(function(resolve, reject) {
        try {
            const text = JSON.stringify(data, null, 2) + '\n';
            fs.writeFile(filePath, text, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch(err) {
            reject(err);
        }
    });
}

async function exec(cmd) {
    console.log(cmd);
    return new Promise(function(resolve, reject) {
        const childProcess = child_process.exec(cmd, function(err, stdout, stderr) {
            if (err) {
                reject(err);
            // } else if (stderr) {
            //     reject(new Error(stderr));
            } else {
                resolve(stderr);
            }
        });
        childProcess.stdout.on('data', data => process.stdout.write(data));
        childProcess.stderr.on('data', data => process.stderr.write(data));
        // childProcess.on('exit', code => console.log(`child process exited with code: ${code}`);
    });
}
