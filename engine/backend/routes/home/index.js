'use strict';

var path = require('path');
var fs   = require('fs');

var qforms            = require('../../qforms');
var helper            = require('../../common/helper');
var ApplicationEditor = require('../../editor/Editor/ApplicationEditor/ApplicationEditor');

qforms.set('home_class_css', helper.getFilePathsSync(path.join(qforms.get('public')), 'home/class', 'css'));
qforms.set('home_class_js' , helper.getFilePathsSync(path.join(qforms.get('public')), 'home/class', 'js'));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    if (req.method === 'GET') {
        helper.getAppInfos(req.app.get('appsDirPath'), function(appInfos) {
            res.render('home/view', {
                req           : req,
                version       : req.app.get('version'),
                home_class_css: req.app.get('home_class_css'),
                home_class_js : req.app.get('home_class_js'),
                appInfos      : appInfos
            });
        });
    }
    if (req.method === 'POST') {
        var appDirPath    = path.join(req.app.get('appsDirPath'), req.body.folder);
        var appFilePath   = path.join(appDirPath,                 req.body.name + '.json');
        helper.createDirIfNotExists(appDirPath, function() {
            ApplicationEditor.createAppFile(appFilePath, {name: req.body.name}, function(appFile) {
                helper.getAppInfos(req.app.get('appsDirPath'), function(appInfos) {
                    res.json({
                        appList: appInfos
                    });
                });
            });
        });
    }
};