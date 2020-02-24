'use strict';

var glob     = require('glob');
var path     = require('path');
var slash    = require('slash');
var fs       = require('fs');
var _        = require('underscore');
var Promise  = require('bluebird');

////////////////////////////////////////////////////////////////////////////////////////////////////
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function _getFilePathsSync(dirPath, ext) {
    var filePaths = glob.sync(path.join(dirPath, '*.' + ext));
    glob.sync(path.join(dirPath, '*/')).forEach(subDirPath => {
        _getFilePathsSync(subDirPath, ext).forEach(fileName => {
            filePaths.push(fileName);
        });
    });
    return filePaths;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function _getFilePaths2(dirPath, ext, filePaths) {
    // all files from directory
    return Helper._glob(path.join(dirPath, '*.' + ext)).then(files => {
        // pushing files to output array
        files.forEach(item => {
            filePaths.push(item);
        });
        // all directories from directory
        return Helper._glob(path.join(dirPath, '*/')).then(dirs => {
            // for each dir push files to output array
            return Promise.each(dirs, subDirPath => {
                return _getFilePaths2(subDirPath, ext, filePaths);
            });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function getRandomString(length) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        var index = getRandomInt(0, chars.length - 1);
        result += chars.substr(index, 1);
    }
    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
String.prototype.template = function (values) {
    var self = this;
    return self.replace(/\{([\w]+)\}/g, (text, name) => {
        return values.hasOwnProperty(name) ? values[name] : text;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Helper {

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static getFilePathsSync(publicDirPath, subDirPath, ext) {
        return _getFilePathsSync(path.join(publicDirPath, subDirPath), ext).map(filePath => {
            return slash(path.relative(publicDirPath, filePath));
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static _glob(path) {
        return new Promise((resolve, reject) => {
            glob(path, (err, items) => {
                if (err) {
                   reject(err);
                } else {
                    resolve(items);
                }
            });
        });
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static getFilePaths(publicDirPath, subDirPath, ext) {
        var filePaths = [];
        return _getFilePaths2(path.join(publicDirPath, subDirPath), ext, filePaths).then(() => {
            var relativeFilePaths = filePaths.map(filePath => {
                return slash(path.relative(publicDirPath, filePath));
            });
            return relativeFilePaths;
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static getAppInfo(appFilePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(appFilePath, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    var data = JSON.parse(content);
                    if (data['@class'] && data['@class'] === 'Application') {
                        var appInfo = Helper.getAppInfoFromData(appFilePath, data);
                        resolve(appInfo);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static getAppInfoFromData(appFilePath, data) {
        var fileName = path.basename(appFilePath, path.extname(appFilePath));
        var dirName  = path.basename(path.dirname(appFilePath));
        return {
            name        : data['@attributes'].name,
            caption     : data['@attributes'].caption,
            route       : [dirName, fileName].join('/'),
            fileName    : fileName,
            dirName     : dirName,
            filePath    : path.resolve(appFilePath),
            fileNameExt : path.basename(appFilePath),
            extName     : path.extname(appFilePath),
            dirPath     : path.resolve(path.dirname(appFilePath))
        };
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static getAppInfos(appsDirPath) {
        return Helper._glob(path.join(appsDirPath, '*/*.json')).then(appFilesPaths => {
            var appInfos = [];
            return Promise.each(appFilesPaths, appFilePath => {
                return Helper.getAppInfo(appFilePath).then(appInfo => {
                    if (appInfo) {
                        appInfos.push(appInfo);
                    }
                });
            }).then(() => {
                return appInfos;
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static currentTime() {
        var now = new Date();
        var hh = now.getHours();   if (hh < 10) hh = '0' + hh;
        var mm = now.getMinutes(); if (mm < 10) mm = '0' + mm;
        var ss = now.getSeconds(); if (ss < 10) ss = '0' + ss;
        return [hh, mm, ss].join(':');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static currentDate() {
        var now = new Date();
        var dd   = now.getDate();      if (dd < 10) dd = '0' + dd;
        var mm   = now.getMonth() + 1; if (mm < 10) mm = '0' + mm;   /*January is 0!*/
        var yyyy = now.getFullYear();
        return [yyyy, mm, dd].join('-');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static currentDateTime() {
        return Helper.currentDate() + ' ' + Helper.currentTime();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static templateValue(value, params) {
        return value.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return params[name];
            } else {
                return null;
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static getCommandLineParams () {
        var params = process.argv.map(arg => {
            var param = arg.split('=');
            return {
                name  : param[0],
                value : param[1]
            }
        });
        return _.object(
            params.map(param => {
                return param.name;
            }),
            params.map(param => {
                return param.value;
            })
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static replaceKey(obj, key1, key2) {
        var keys   = Object.keys(obj);
        var values = _.filter(obj, () => {return true;});
        var index  = keys.indexOf(key1);
        if (index !== -1) {
            keys[index] = key2;
            obj = _.object(keys, values);
        }
        return obj;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static getFileContent(filePath) {
        return new Promise((resolve, reject) => {
            fs.exists(filePath, exists => {
                if (exists) {
                    fs.readFile(filePath, 'utf8', (err, content) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(content);
                        }
                    });
                } else {
                    resolve(null);
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static putFileContent(filePath, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, 'utf8', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static createDirIfNotExists(dirPath) {
        return new Promise((resolve, reject) => {
            fs.exists(dirPath, exists => {
                if (exists) {
                    resolve();
                } else {
                    fs.mkdir(dirPath, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static createDirIfNotExistsSync(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static moveObjProp(obj, prop, offset) {
        var keys     = _.keys(obj);
        var values   = _.values(obj);
        var oldIndex = keys.indexOf(prop);
        if (oldIndex === -1) {
            throw new Error('cannot find element');
        }
        var newIndex = oldIndex + offset;
        if (newIndex < 0) {
            throw new Error('cannot up top element');
        }
        if (newIndex > values.length - 1) {
            throw new Error('cannot down bottom element');
        }
        keys.splice(newIndex, 0,   keys.splice(oldIndex, 1)[0]);
        values.splice(newIndex, 0, values.splice(oldIndex, 1)[0]);
        return _.object(keys, values);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static getTempSubDirPath3(tempDirPath) {
        return new Promise((resolve, reject) => {
            var subDirName = getRandomString(8);
            var tempSubSirPath = path.join(tempDirPath, subDirName);
            fs.exists(tempSubSirPath, exists => {
                if (!exists) {
                    fs.mkdir(tempSubSirPath, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(tempSubSirPath);
                        }
                    });
                } else {
                    Helper.getTempSubDirPath(tempDirPath, () => {
                        resolve();
                    });
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static copyFile3(source, target) {
        return new Promise((resolve, reject) => {
            var rd = fs.createReadStream(source);
            rd.on('error', err => {
                reject(err);
            });
            var wr = fs.createWriteStream(target);
            wr.on('error', err => {
                reject(err);
            });
            wr.on('close', () => {
                resolve();
            });
            rd.pipe(wr);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static exists(path) {
        //console.log('Helper.exists');
        return new Promise(resolve => {
            fs.exists(path, exists => {
                resolve(exists);
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static readFile(path) {
        //console.log('Helper.readFile');
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(content);
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static writeFile(path, content) {
        //console.log('Helper.writeFile');
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, 'utf8', err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    static escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, s => {
            return entityMap[s];
        });
    }

}

module.exports = Helper;