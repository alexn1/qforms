"use strict"

var path = require('path');
var fs   = require('fs');

var helper = require('../../common/helper');
var app    = require('../../qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    var appFilePath = path.join(app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
    helper.getAppInfo(appFilePath, function(appInfo) {
        var relFilePath = req.params["0"];
        var filePath = path.join(appInfo.dirPath, relFilePath);
        if (path.extname(filePath) === '.css') {
            fs.exists(filePath, function(exists) {
                if (exists) {
                    fs.readFile(filePath, 'utf8', function(err, data) {
                        res.contentType(filePath);
                        res.send(data);
                    });
                } else {
                    next();
                }
            });
        } else {
            next();
        }
    });
};