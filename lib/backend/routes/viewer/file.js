'use strict';

var path   = require('path');
var fs     = require('fs');
var domain = require('domain');

var qforms = require('../../../qforms');
var server = require('../../../server');

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    var appFilePath = path.join(server.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
    qforms.helper.getAppInfo2(appFilePath).then(function(appInfo) {
        var relFilePath = req.params['0'];
        var filePath = path.join(appInfo.dirPath, relFilePath);
        if (path.extname(filePath) === '.css') {
            fs.exists(filePath, function(exists) {
                if (exists) {
                    var d = domain.create();
                    if (server.get('handleException') === true) {
                        d.on('error', next);
                    }
                    d.run(function() {
                        fs.readFile(filePath, 'utf8', function(err, data) {
                            console.log('filePath:', filePath);
                            res.contentType(filePath);
                            res.send(data);
                        });
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