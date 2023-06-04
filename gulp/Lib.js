const fs = require('fs');
const child_process = require('child_process');

class Lib {
    static getJsonFileData(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', function (err, text) {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const data = JSON.parse(text);
                        resolve(data);
                    } catch (err) {
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
        // console.log('putJsonFileData version:', data.version);
        return new Promise((resolve, reject) => {
            try {
                const text = JSON.stringify(data, null, 4) + '\n';
                fs.writeFile(filePath, text, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    static async exec(cmd, throwStdErr = true) {
        console.log(cmd);
        return new Promise(function (resolve, reject) {
            const childProcess = child_process.exec(cmd, function (err, stdout, stderr) {
                if (err) {
                    reject(err);
                } else {
                    if (stderr && throwStdErr) {
                        reject(new Error(stderr));
                    } else {
                        resolve(stderr);
                    }
                }
            });
            childProcess.stdout.on('data', (data) => process.stdout.write(data));
            childProcess.stderr.on('data', (data) => process.stderr.write(data));
            childProcess.on('exit', (code) =>
                console.log(`${cmd} process exited with code: ${code}`),
            );
        });
    }

    static versionWithDev(version) {
        const ver = version.split('.');
        const major = ver[0];
        const minor = ver[1];
        const patch = ver[2].split('-');
        return [major, minor, [patch[0], 'dev'].join('-')].join('.');
    }

    static incMinor(version) {
        const ver = version.split('.');
        const major = ver[0];
        let minor = ver[1];
        const patch = ver[2];
        minor = parseInt(minor) + 1;
        return [major, minor, patch].join('.');
    }
}

module.exports = Lib;
