const fs = require('fs');

class Lib {
    static getJsonFileData(filePath) {
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

    static versionWithoutDev(version) {
        const ver = version.split('.');
        const major = ver[0];
        const minor = ver[1];
        const patch = ver[2].split('-');
        return [major, minor, patch[0]].join('.');
    }

    static incPatch(version) {
        const ver = version.split('.');
        const major = ver[0];
        const minor = ver[1];
        let patch = ver[2];
        patch = parseInt(patch) + 1;
        return [major, minor, patch].join('.');
    }

    static putJsonFileData(filePath, data) {
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
}

module.exports = Lib;
