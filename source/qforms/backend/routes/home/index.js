'use strict';

var path = require('path');
var fs   = require('fs');

var qforms = require('../../../qforms');
var server = require('../../../server');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    if (req.method === 'GET') {
        qforms.helper.getAppInfos(req.app.get('appsDirPath')).then(function(appInfos) {
            res.render('home/view', {
                req           : req,
                version       : req.app.get('version'),
                commonClassCss: req.app.get('commonClassCss'),
                commonClassJs : req.app.get('commonClassJs'),
                homeClassCss  : req.app.get('homeClassCss'),
                homeClassJs   : req.app.get('homeClassJs'),
                appInfos      : appInfos
            });
        });
    }
    if (req.method === 'POST') {
        var appDirPath    = path.join(req.app.get('appsDirPath'), req.body.folder);
        var appFilePath   = path.join(appDirPath,                 req.body.name + '.json');
        qforms.helper.createDirIfNotExists(appDirPath, function() {
            qforms.ApplicationEditor.createAppFile(appFilePath, {name: req.body.name}, function(appFile) {
                qforms.helper.getAppInfos(req.app.get('appsDirPath')).then(function(appInfos) {
                    res.json({
                        appList: appInfos
                    });
                });
            });
        });
    }
};