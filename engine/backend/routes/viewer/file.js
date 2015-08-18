'use strict';

var path = require('path');
var fs   = require('fs');

var qforms = require('../../qforms');
var server = require('../../server');

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    var appFilePath = path.join(server.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
    qforms.helper.getAppInfo(appFilePath, function(appInfo) {
        var relFilePath = req.params['0'];
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