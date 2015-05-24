"use strict"

var path = require('path');
var fs   = require('fs');

var qforms          = require('../../qforms');
var helper          = require('../../common/helper');
var ApplicationFile = require('../../editor/JsonFile/ApplicationFile/ApplicationFile');

qforms.set('home_class_css', helper.getFilePathsSync(path.join(qforms.get('public')), 'home/class', 'css'));
qforms.set('home_class_js' , helper.getFilePathsSync(path.join(qforms.get('public')), 'home/class', 'js'));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    if (req.method === 'GET') {
        helper.getAppInfos(req.app.get('appsDirPath'), function(appInfos) {
            res.render('home/view', {
                version: req.app.get('version'),
                home_class_css:req.app.get('home_class_css'),
                home_class_js:req.app.get('home_class_js'),
                appInfos:appInfos
            });
        });
    }
    if (req.method === 'POST') {
        var appDirPath    = path.join(req.app.get('appsDirPath'), req.body.folder);
        var appFilePath   = path.join(appDirPath, req.body.name + '.json');
        var createAppFile = function(_callback) {
            fs.exists(appFilePath, function(exists) {
                if (exists) {
                    throw new Error('Application {name} aready exists'.replace('{name}', req.body.name));
                } else {
                    var appData = ApplicationFile.createAppData({name: req.body.name});
                    var content = JSON.stringify(appData, null, 4);
                    fs.writeFile(appFilePath, content,'utf8', function(err) {
                        if (err) {
                            throw err;
                        } else {
                            helper.getAppInfos(req.app.get('appsDirPath'), function(appInfos) {
                                _callback({
                                    appList: appInfos
                                });
                            });
                        }
                    });
                }
            });
        };

        fs.exists(appDirPath, function(exists) {
            if (exists) {
                createAppFile(function(result) {
                    res.json(result);
                });
            } else {
                fs.mkdir(appDirPath, function(err) {
                    if (err) {
                        throw err;
                    } else {
                        createAppFile(function(result) {
                            res.json(result);
                        });
                    }
                });
            }
        });
    }
};