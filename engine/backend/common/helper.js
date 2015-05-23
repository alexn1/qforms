"use strict"

var glob  = require('glob');
var path  = require('path');
var slash = require('slash');
var async = require('async');
var fs    = require('fs');
var _     = require('underscore');

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    getFilePathsSync: getFilePathsSync,
    getFilePaths    : getFilePaths,
    getAppInfo      : getAppInfo,
    getAppInfos     : getAppInfos,
    currentTime     : currentTime,
    currentDate     : currentDate,
    replaceThis     : replaceThis,
    queryFormat     : queryFormat,
    typeCast        : typeCast,
    getParams       : getParams,
    replaceKey      : replaceKey
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function _getFilePathsSync(dirPath, ext) {
    var filePaths = glob.sync(path.join(dirPath,'*.' + ext));
    glob.sync(path.join(dirPath,'*/')).forEach(function(subDirPath) {
        _getFilePathsSync(subDirPath,ext).forEach(function(fileName) {
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
    // берём все файлы из директории
    glob(path.join(dirPath,'*.' + ext), function(err, items) {
        // помещаем их в выходной массив
        items.forEach(function(item) {
            filePaths.push(item);
        });
        // берём все директории из директории
        glob(path.join(dirPath,'*/'), function(err, items) {
            // и для каждой директории получаем список файлов
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
                var fileName = path.basename(appFilePath, path.extname(appFilePath));
                var dirName  = path.basename(path.dirname(appFilePath));
                callback({
                    name        : data['@attributes'].name,
                    caption     : data['@attributes'].caption,
                    route       : dirName + '/' + fileName,
                    fileName    : fileName,
                    dirName     : dirName,
                    filePath    : path.resolve(appFilePath),
                    fileNameExt : path.basename(appFilePath),
                    extName     : path.extname(appFilePath),
                    dirPath     : path.resolve(path.dirname(appFilePath))
                });
            } else {
                throw new Error('not application');
            }
        }
    });
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
    return [hh,mm,ss].join(":");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function currentDate() {
    var now = new Date();
    var dd = now.getDate();      if (dd < 10) dd = '0' + dd;
    var mm = now.getMonth() + 1; if (mm < 10) mm = '0' + mm;   /*January is 0!*/
    var yyyy = now.getFullYear();
    return [yyyy,mm,dd].join("-");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function replaceThis(query, page, form) {
    //var matches = query.match(/@([\w]+\.[\w]+\.[\w]+)/g);
    //var matches = query.match(/@([\w]+)([^\w\.]|$)/g);
    var params = getUsedParams(query);
    console.log(query);
    console.log('replaceThis');
    console.log(params);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function queryFormat(query, params) {
    if (params) {
        return query.replace(/@([\w\.]+)/g, function (text, name) {
            return params.hasOwnProperty(name) ? this.escape(params[name]) : 'NULL';
        }.bind(this));
    } else {
        return query;
    }
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