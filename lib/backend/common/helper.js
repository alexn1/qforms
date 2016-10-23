'use strict';

module.exports = helper;

var glob     = require('glob');
var path     = require('path');
var slash    = require('slash');
var fs       = require('fs');
var _        = require('underscore');
var mysql    = require('mysql');
var Promise  = require('bluebird');

function helper() {}

////////////////////////////////////////////////////////////////////////////////////////////////////
function _getFilePathsSync(dirPath, ext) {
    var filePaths = glob.sync(path.join(dirPath, '*.' + ext));
    glob.sync(path.join(dirPath, '*/')).forEach(function(subDirPath) {
        _getFilePathsSync(subDirPath, ext).forEach(function(fileName) {
            filePaths.push(fileName);
        });
    });
    return filePaths;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.getFilePathsSync = function(publicDirPath, subDirPath, ext) {
    return _getFilePathsSync(path.join(publicDirPath, subDirPath), ext).map(function(filePath) {
        return slash(path.relative(publicDirPath, filePath));
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper._glob = function(path) {
    return new Promise(function(resolve, reject) {
        glob(path, function(err, items) {
            if (err) {
               reject(err);
            } else {
                resolve(items);
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function _getFilePaths2(dirPath, ext, filePaths) {
    // all files from directory
    return helper._glob(path.join(dirPath, '*.' + ext)).then(function(files) {
        // pushing files to output array
        files.forEach(function(item) {
            filePaths.push(item);
        });
        // all directories from directory
        return helper._glob(path.join(dirPath, '*/')).then(function(dirs) {
            // for each dir push files to output array
            return Promise.each(dirs, function(subDirPath) {
                return _getFilePaths2(subDirPath, ext, filePaths);
            });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.getFilePaths = function(publicDirPath, subDirPath, ext) {
    var filePaths = [];
    return _getFilePaths2(path.join(publicDirPath, subDirPath), ext, filePaths).then(function() {
        var relativeFilePaths = filePaths.map(function(filePath) {
            return slash(path.relative(publicDirPath, filePath));
        });
        return relativeFilePaths;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.getAppInfo2 = function(appFilePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(appFilePath, 'utf8', function(err, content) {
            if (err) {
                reject(err);
            } else {
                var data = JSON.parse(content);
                if (data['@class'] && data['@class'] === 'Application') {
                    var appInfo = helper.getAppInfoFromData(appFilePath, data);
                    resolve(appInfo);
                } else {
                    resolve(null);
                }
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.getAppInfoFromData = function(appFilePath, data) {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.getAppInfos = function(appsDirPath) {
    return helper._glob(path.join(appsDirPath, '*/*.json')).then(function(appFilesPaths) {
        var appInfos = [];
        return Promise.each(appFilesPaths, function(appFilePath) {
            return helper.getAppInfo2(appFilePath).then(function(appInfo) {
                if (appInfo) {
                    appInfos.push(appInfo);
                }
            });
        }).then(function() {
            return appInfos;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.currentTime = function() {
    var now = new Date();
    var hh = now.getHours();   if (hh < 10) hh = '0' + hh;
    var mm = now.getMinutes(); if (mm < 10) mm = '0' + mm;
    var ss = now.getSeconds(); if (ss < 10) ss = '0' + ss;
    return [hh, mm, ss].join(':');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.currentDate = function() {
    var now = new Date();
    var dd   = now.getDate();      if (dd < 10) dd = '0' + dd;
    var mm   = now.getMonth() + 1; if (mm < 10) mm = '0' + mm;   /*January is 0!*/
    var yyyy = now.getFullYear();
    return [yyyy, mm, dd].join('-');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.currentDateTime = function() {
    return helper.currentDate() + ' ' + helper.currentTime();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.queryFormat = function(query, params) {
    params = params || {};
    var sql = query.replace(/\{([\w\.@]+)\}/g, function (text, name) {
        if (params.hasOwnProperty(name)) {
            return mysql.escape(params[name]);
        } else {
            return 'NULL';
        }
    });
    //console.log('real db sql: ' + sql);
    return sql;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.templateValue = function(value, params) {
    return value.replace(/\{([\w\.@]+)\}/g, function (text, name) {
        if (params.hasOwnProperty(name)) {
            return params[name];
        } else {
            return null;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.typeCast = function(field, next) {
    if (
        field.type === 'DATE'      ||
        field.type === 'DATETIME'  ||
        field.type === 'TIME'      ||
        field.type === 'TIMESTAMP'
    ) {
        return field.string();
    } else {
        return next();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.getCommandLineParams = function() {
    var params = process.argv.map(function(arg) {
        var param = arg.split('=');
        return {
            name  : param[0],
            value : param[1]
        }
    });
    return _.object(
        params.map(function(param) {
            return param.name;
        }),
        params.map(function(param) {
            return param.value;
        })
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.replaceKey = function(obj, key1, key2) {
    var keys   = Object.keys(obj);
    var values = _.filter(obj, function () {return true;});
    var index  = keys.indexOf(key1);
    if (index !== -1) {
        keys[index] = key2;
        obj = _.object(keys, values);
    }
    return obj;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.getFileContent2 = function(filePath) {
    return new Promise(function(resolve, reject) {
        fs.exists(filePath, function(exists) {
            if (exists) {
                fs.readFile(filePath, 'utf8', function (err, content) {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.putFileContent = function(filePath, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(filePath, content, 'utf8', function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.createDirIfNotExists2 = function(dirPath) {
    return new Promise(function(resolve, reject) {
        fs.exists(dirPath, function(exists) {
            if (exists) {
                resolve();
            } else {
                fs.mkdir(dirPath, function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.createDirIfNotExistsSync = function(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.moveObjProp = function(obj, prop, offset) {
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
};

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
helper.getTempSubDirPath2 = function(tempDirPath) {
    return new Promise(function (resolve, reject) {
        var subDirName = getRandomString(8);
        var tempSubSirPath = path.join(tempDirPath, subDirName);
        fs.exists(tempSubSirPath, function(exists) {
            if (!exists) {
                fs.mkdir(tempSubSirPath, function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(tempSubSirPath);
                    }
                });
            } else {
                helper.getTempSubDirPath(tempDirPath, function () {
                    resolve();
                });
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.copyFile2 = function(source, target) {
    return new Promise(function (resolve, reject) {
        var rd = fs.createReadStream(source);
        rd.on('error', function(err) {
            reject(err);
        });
        var wr = fs.createWriteStream(target);
        wr.on('error', function(err) {
            reject(err);
        });
        wr.on('close', function () {
            resolve();
        });
        rd.pipe(wr);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.exists = function(path) {
    //console.log('helper.exists');
    return new Promise(function (resolve) {
        fs.exists(path, function (exists) {
            resolve(exists);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.readFile = function(path) {
    //console.log('helper.readFile');
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf8', function(err, content) {
            if (err) {
                reject(err)
            } else {
                resolve(content);
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
helper.writeFile = function(path, content) {
    //console.log('helper.writeFile');
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, 'utf8', function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
String.prototype.template = function (values) {
    var self = this;
    return self.replace(/\{([\w]+)\}/g, function (text, name) {
        return values.hasOwnProperty(name) ? values[name] : text;
    });
};