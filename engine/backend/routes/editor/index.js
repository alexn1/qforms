'use strict';

var path   = require('path');
var fs     = require('fs');
var domain = require('domain');

var qforms = require('../../../qforms');
var server = require('../../../server');

server.set('editorClassCss', qforms.helper.getFilePathsSync(server.get('public'), 'editor/class', 'css'));
server.set('editorClassJs',  qforms.helper.getFilePathsSync(server.get('public'), 'editor/class', 'js'));

var controllers = [
    'Application',
    'Database',
    'DataSource',
    'Field',
    'Control',
    'Form',
    'KeyColumn',
    'Page',
    'PageLink',
    'Param',
    'ParentKeyColumn'
];

var actions = [
    'save',
    '_new',
    'delete',
    'getView',
    'saveView',
    'saveController',
    'createView',
    'createController',
    'get',
    'getTableInfo',
    'changeClass',
    'moveUp',
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
                    qforms.helper.getAppInfo(appFilePath, function(appInfo) {
                        var d = domain.create();
                        if (server.get('handleException') === true) {
                            d.on('error', next);
                        }
                        d.run(function() {
                            handle(req, res, next, appInfo);
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
function handle(req, res, next, appInfo) {
    switch (req.method) {
        case 'GET':
            index(req, res, next, appInfo);
            break;
        case 'POST':
            action(req, res, next, appInfo);
            break;
        default:
            next();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function index(req, res, next, appInfo) {
    var appFile = new qforms.JsonFile(appInfo.filePath);
    appFile.read(function() {
        res.render('editor/view', {
            version        : req.app.get('version'),
            commonClassCss : req.app.get('commonClassCss'),
            commonClassJs  : req.app.get('commonClassJs'),
            editorClassCss : req.app.get('editorClassCss'),
            editorClassJs  : req.app.get('editorClassJs'),
            runAppLink     : '/view/' + appInfo.route + '?debug=1',
            appFileContent : appFile.content,
            appName        : appFile.getAttr('name')
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function action(req, res, next, appInfo) {
    if (controllers.indexOf(req.body.controller) !== -1) {
        if (actions.indexOf(req.body.action) !== -1) {
            var code = 'var ctrl = new qforms.{controller}EditorController(appInfo);\
                            ctrl.{action}(req.body.params, function(result) {\
                                res.json(result);\
                            });'
                .replace('{controller}', req.body.controller)
                .replace('{action}'    , req.body.action);
            eval(code);
        } else {
            res.end('Unknown action {action}'.replace('{action}', req.body.action));
        }
    } else {
        res.end('Unknown controller {controller}'.replace('{controller}', req.body.controller));
    }
}