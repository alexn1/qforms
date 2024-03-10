const fs = require('fs');
const child_process = require('child_process');

class Lib {
    static getJsonFileData(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, text) => {
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

    static exec(cmd, quiet = true) {
        return new Promise((resolve, reject) => {
            console.log(cmd);
            let exitCode;
            const childProcess = child_process.exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.error('callback:', JSON.stringify({ err, stdout, stderr }, null, 4));
                    err.code = exitCode;
                    err.stdout = stdout;
                    err.stderr = stderr;
                    reject(err);
                } else {
                    resolve(stdout);
                }
            });
            childProcess.on('exit', (code) => (exitCode = code));
            if (!quiet) {
                childProcess.stdout.on('data', (data) => process.stdout.write(data));
                childProcess.stderr.on('data', (data) => process.stderr.write(data));
            }
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

    static async getVersion() {
        return (await Lib.getJsonFileData('package.json')).version;
    }

    static async setVersion(version) {
        // package.json
        const packageJson = await Lib.getJsonFileData('package.json');
        packageJson.version = version;
        await Lib.putJsonFileData('package.json', packageJson);

        // package-lock.json
        const packageLockJson = await Lib.getJsonFileData('package-lock.json');
        packageLockJson.version = packageLockJson.packages[''].version = version;
        await Lib.putJsonFileData('package-lock.json', packageLockJson);
    }

    static async isDiff() {
        try {
            await Lib.exec('git diff --exit-code');
        } catch (err) {
            if (err.code) return true;
        }
        return false;
    }
}

module.exports = Lib;
