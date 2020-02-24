'use strict';

var path   = require('path');
var fs     = require('fs');

var qforms = require('../../../qforms');
var server = require('../../../server');

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = (req, res, next) => {
    //console.log('req.params.appDirName' , req.params.appDirName);
    //console.log('req.params.appFileName', req.params.appFileName);
    var appFilePath = path.join(server.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
    qforms.Helper.getAppInfo(appFilePath).then(appInfo => {
        var relFilePath = req.params['0'];
        var filePath = path.join(appInfo.dirPath, relFilePath);
        if (path.extname(filePath) === '.css') {
            fs.exists(filePath, exists => {
                if (exists) {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            next(err);
                        } else {
                            console.log('filePath:', filePath);
                            res.contentType(filePath);
                            res.send(data);
                        }
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