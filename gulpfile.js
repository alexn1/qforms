/*
const fs = require('fs');

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

function versionWithoutDev(version) {
    const ver = version.split('.');
    const major = ver[0];
    const minor = ver[1];
    const patch = ver[2].split('-');
    return [major, minor, patch[0]].join('.');
}

function incPatch(version) {
    const ver = version.split('.');
    const major = ver[0];
    const minor = ver[1];
    let patch = ver[2];
    patch = parseInt(patch) + 1;
    return [major, minor, patch].join('.');
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
}*/

/*module.exports.test1 = async function () {
    const packageJson = await getJsonFileData('package.json');
    packageJson.version = incPatch(versionWithoutDev(packageJson.version));
    await putJsonFileData('package.json', packageJson);
};*/

module.exports.build           = require('./gulp/build');
module.exports.clean           = require('./gulp/clean');
module.exports.ts              = require('./gulp/backend_ts');
module.exports.frontend_viewer = require('./gulp/frontend_viewer');
