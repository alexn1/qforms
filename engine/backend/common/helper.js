'use strict';

var glob  = require('glob');
var path  = require('path');
var slash = require('slash');
var async = require('async');
var fs    = require('fs');
var _     = require('underscore');
var mysql = require('mysql');

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    getFilePathsSync    : getFilePathsSync,
    getFilePaths        : getFilePaths,
    getAppInfo          : getAppInfo,
    getAppInfos         : getAppInfos,
    currentTime         : currentTime,
    currentDate         : currentDate,
    queryFormat         : queryFormat,
    typeCast            : typeCast,
    getParams           : getParams,
    replaceKey          : replaceKey,
    getFileContent      : getFileContent,
    putFileContent      : putFileContent,
    moveObjProp         : moveObjProp,
    copyFile            : copyFile,
    createDirIfNotExists    : createDirIfNotExists,
    createDirIfNotExistsSync: createDirIfNotExistsSync,
    getTempSubDirPath       : getTempSubDirPath,
    getXmlObjectFromDataSet : getXmlObjectFromDataSet
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function _getFilePathsSync(dirPath, ext) {
    var filePaths = glob.sync(path.join(dirPath, '*.' + ext));
    glob.sync(path.join(dirPath, '*/')).forEach(function(subDirPath) {
        _getFilePathsSync(subDirPath, ext).forEach(function(fileName) {
            filePaths.push(fileName);
        });
    });
    return filePaths;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function getFilePathsSync(publicDirPath, subDirPath, ext) {
    return _getFilePathsSync(path.join(publicDirPath, subDirPath), ext).map(function(filePath) {
        return slash(path.relative(publicDirPath, filePath));
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
function _getFilePaths(dirPath, ext, filePaths, callback) {
    // all files from directory
    glob(path.join(dirPath, '*.' + ext), function(err, items) {
        // pushing files to output array
        items.forEach(function(item) {
            filePaths.push(item);
        });
        // all directories from directory
        glob(path.join(dirPath, '*/'), function(err, items) {
            // get all files for each directory
            async.eachSeries(items, function(subDirPath, next) {
                _getFilePaths(subDirPath, ext, filePaths, next);
            }, function() {
                callback();
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function getFilePaths(publicDirPath, subDirPath, ext, callback) {
    var filePaths = [];
    _getFilePaths(path.join(publicDirPath, subDirPath), ext, filePaths, function() {
        var relativeFilePaths = filePaths.map(function(filePath) {
            return slash(path.relative(publicDirPath, filePath));
        });
        callback(relativeFilePaths);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function getAppInfo(appFilePath, callback) {
    fs.readFile(appFilePath, 'utf8', function(err, content) {
        if (err) {
            throw err;
        } else {
            var data = JSON.parse(content);
            if (data['@class'] && data['@class'] === 'Application') {
                var appInfo = module.exports.getAppInfo2(appFilePath, data);
                callback(appInfo);
            } else {
                callback(null);
            }
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getAppInfo2 = function(appFilePath, data) {
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
function getAppInfos(appsDirPath, callback) {
    var appInfos = [];
    glob(path.join(appsDirPath, '*/*.json'), function(err, appFilesPaths) {
        async.eachSeries(appFilesPaths, function(appFilePath, next) {
            getAppInfo(appFilePath, function(appInfo) {
                if (appInfo) {
                    appInfos.push(appInfo);
                }
                next();
            });
        }, function() {
            callback(appInfos);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function currentTime() {
    var now = new Date();
    var hh = now.getHours();   if (hh < 10) hh = '0' + hh;
    var mm = now.getMinutes(); if (mm < 10) mm = '0' + mm;
    var ss = now.getSeconds(); if (ss < 10) ss = '0' + ss;
    return [hh, mm, ss].join(':');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function currentDate() {
    var now = new Date();
    var dd   = now.getDate();      if (dd < 10) dd = '0' + dd;
    var mm   = now.getMonth() + 1; if (mm < 10) mm = '0' + mm;   /*January is 0!*/
    var yyyy = now.getFullYear();
    return [yyyy, mm, dd].join('-');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function queryFormat(query, params) {
    params = params || {};
    var sql = query.replace(/\{([\w\.@]+)\}/g, function (text, name) {
        if (params.hasOwnProperty(name)) {
            return mysql.escape(params[name]);
        } else {
            return 'NULL';
        }
    });
    console.log('real db sql: ' + sql);
    return sql;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.templateValue = function(value, params) {
    return value.replace(/\{([\w\.@]+)\}/g, function (text, name) {
        if (params.hasOwnProperty(name)) {
            return params[name];
        } else {
            return null;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function typeCast(field, next) {
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
function getParams() {
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
function replaceKey(obj, key1, key2) {
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
function getFileContent(filePath, callback) {
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, 'utf8', function (err, content) {
                if (err) {
                    throw err;
                } else {
                    callback(content);
                }
            });
        } else {
            callback(null);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function putFileContent(filePath, content, callback) {
    fs.writeFile(filePath, content, 'utf8', function(err) {
        if (err) {
            throw err;
        } else {
            callback();
        }
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
function createDirIfNotExists(dirPath, callback) {
    fs.exists(dirPath, function(exists) {
        if (exists) {
            callback();
        } else {
            fs.mkdir(dirPath, function(err) {
                if (err) {
                    throw err;
                } else {
                    callback();
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function createDirIfNotExistsSync(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function moveObjProp(obj, prop, offset) {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function getTempSubDirPath(tempDirPath, callback) {
    var subDirName     = getRandomString(8);
    var tempSubSirPath = path.join(tempDirPath, subDirName);
    fs.exists(tempSubSirPath, function(exists) {
        if (!exists) {
            fs.mkdir(tempSubSirPath, function(err) {
                if (err) {
                    throw err;
                } else {
                    callback(tempSubSirPath);
                }
            });
        } else {
            getTempSubDirPath(tempDirPath, callback);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function copyFile(source, target, callback) {
    var rd = fs.createReadStream(source);
    rd.on('error', function(err) {
        throw err;
    });
    var wr = fs.createWriteStream(target);
    wr.on('error', function(err) {
        throw err;
    });
    wr.on('close', callback);
    rd.pipe(wr);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function getXmlObjectFromDataSet(dataSet) {
    var dsName = dataSet['@attributes'].name;
    var xmlObject = {};
    xmlObject[dsName] = [];
    for (var tableName in dataSet.tables) {
        var table = dataSet.tables[tableName];
        for (var i = 0; i < table.rows.length; i++) {
            var row = table.rows[i];
            var rowElement = {};
            rowElement[tableName] = [];
            for (var columnName in row) {
                var attrElement = {};
                attrElement[columnName] = row[columnName];
                rowElement[tableName].push(attrElement);
            }
            xmlObject[dsName].push(rowElement);
        }
    }
    return xmlObject;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
String.prototype.template = function (values) {
    return this.replace(/\{([\w]+)\}/g, function (text, name) {
        return values.hasOwnProperty(name) ? values[name] : text;
    });
};