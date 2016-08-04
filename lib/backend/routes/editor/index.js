'use strict';

var path    = require('path');
var fs      = require('fs');
var domain  = require('domain');
var Promise = require('bluebird');

var qforms = require('../../../qforms');
var server = require('../../../server');

var CONTROLLERS = [
    'Application',
    'Database'   ,
    'DataSource' ,
    'Field'      ,
    'Control'    ,
    'Form'       ,
    'KeyColumn'  ,
    'Page'       ,
    'PageLink'   ,
    'Param'      ,
    'ParentKeyColumn'
];

var ACTIONS = [
    'save'            ,
    '_new'            ,
    'delete'          ,
    'getView'         ,
    'saveView'        ,
    'saveController'  ,
    'createView'      ,
    'createController',
    'get'             ,
    'getTableInfo'    ,
    'changeClass'     ,
    'moveUp'          ,
    'moveDown'
];

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    if (req.app.get('env') === 'development') {
        if (req.params.appDirName && req.params.appFileName) {
            // var route = req.params.appDirName + '/' + req.params.appFileName;
            var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
            fs.exists(appFilePath, function(exists) {
                if (exists) {
                    qforms.helper.getAppInfo2(appFilePath).then(function(appInfo) {
                        var d = domain.create();
                        if (server.get('handleException') === true) {
                            d.on('error', next);
                        }
                        d.run(function() {
                            handle(req, res, appInfo, next);
                        });
                    });
                } else {
                    next();
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function handle(req, res, appInfo, next) {
    switch (req.method) {
        case 'GET':
            index(req, res, appInfo).then(function (options) {
                res.render('editor/view', options);
            });
            break;
        case 'POST':
            action(req, res, appInfo);
            break;
        default:
            next();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function index(req, res, appInfo) {
    var appFile = new qforms.JsonFile(appInfo.filePath);
    return appFile.read2().then(function () {
        return {
            version        : req.app.get('version'),
            commonClassCss : req.app.get('commonClassCss'),
            commonClassJs  : req.app.get('commonClassJs'),
            editorClassCss : req.app.get('editorClassCss'),
            editorClassJs  : req.app.get('editorClassJs'),
            runAppLink     : '/view/' + appInfo.route + '?debug=1',
            appFileContent : appFile.content,
            appName        : appFile.getAttr('name')
        };
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function action(req, res, appInfo) {
    console.log('action:', req.body.controller, req.body.action);
    if (CONTROLLERS.indexOf(req.body.controller) !== -1) {
        if (ACTIONS.indexOf(req.body.action) !== -1) {
            var ControllerClassName = 'qforms.{controller}EditorController'.replace('{controller}', req.body.controller);
            var ControllerClass = eval(ControllerClassName);
            var method = req.body.action;
            var ctrl = new ControllerClass(appInfo);
            ctrl[method](req.body.params, function(result) {
                res.json(result);
            });
        } else {
            res.end('Unknown action {action}'.replace('{action}', req.body.action));
        }
    } else {
        res.end('Unknown controller {controller}'.replace('{controller}', req.body.controller));
    }
}