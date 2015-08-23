'use strict';

var fs            = require('fs');
var Promise       = require('bluebird');
var child_process = require('child_process');

main();

////////////////////////////////////////////////////////////////////////////////////////////////////
function main() {
    var version;
    return exec('git checkout master').then(function() {
        return exec('git pull origin master');
    })/*.then(function() {
        return exec('git push origin master');
    })*/.then(function() {
        return getJsonFileData('package.json').then(function(data) {
            version = data.version = versionWithoutDev(data.version);
            return putJsonFileData('package.json', data);
        });
    }).then(function() {
        return exec('git commit -am "release v{version}"'.replace('{version}', version));
    }).then(function() {
        return exec('git checkout release');
    }).then(function() {
        return exec('git pull origin release');
    }).then(function() {
        return exec('git merge master');
    }).then(function() {
        return exec('git tag -am v{version} "v{version}"'
            .replace('{version}', version)
            .replace('{version}', version)
        );
    })/*.then(function() {
        return exec('git push origin release');
    }).then(function() {
        return exec('git push origin --tags');
    })*/.then(function() {
        return exec('git checkout master');
    })/*.then(function() {
        return exec('git push origin master');
    })*/.then(function() {
        return getJsonFileData('package.json').then(function(data) {
            version = data.version = versionWithDev(incPatch(data.version));
            return putJsonFileData('package.json', data);
        });
    }).then(function() {
        return exec('git commit -am "begin v{version}"'.replace('{version}', versionWithoutDev(version)));
    })/*.then(function() {
        return exec('git push origin master');
    })*/.catch(function(err) {
        console.error(err);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function versionWithoutDev(version) {
    var ver = version.split('.');
    var major = ver[0];
    var minor = ver[1];
    var patch = ver[2].split('-');
    return [major, minor, patch[0]].join('.');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function versionWithDev(version) {
    var ver = version.split('.');
    var major = ver[0];
    var minor = ver[1];
    var patch = ver[2].split('-');
    return [major, minor, [patch[0], 'dev'].join('-')].join('.');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function incMinor(version) {
    var ver = version.split('.');
    var major = ver[0];
    var minor = ver[1];
    var patch = ver[2];
    minor = parseInt(minor) + 1;
    return [major, minor, patch].join('.');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function incPatch(version) {
    var ver = version.split('.');
    var major = ver[0];
    var minor = ver[1];
    var patch = ver[2];
    minor = parseInt(patch) + 1;
    return [major, minor, patch].join('.');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function getJsonFileData(filePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, 'utf8', function(err, text) {
            if (err) {
                reject(err);
            } else {
                try {
                    var data = JSON.parse(text);
                    resolve(data);
                } catch(err) {
                    reject(err);
                }
            }
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function putJsonFileData(filePath, data) {
    return new Promise(function(resolve, reject) {
        try {
            var text = JSON.stringify(data, null, 2) + '\n';
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

////////////////////////////////////////////////////////////////////////////////////////////////////
function exec(cmd) {
    console.log(cmd);
    return new Promise(function(resolve, reject) {
        child_process.exec(cmd, function(err, stdout, stderr) {
            if (err) {
                reject(err);
            } else {
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
}