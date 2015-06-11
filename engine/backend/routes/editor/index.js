'use strict';

var config = require('config');
var path   = require('path');
var fs     = require('fs');
var helper = require('../../common/helper');
var qforms = require('../../qforms');
var domain = require('domain');

var ApplicationController       = require('../../editor/Controller/VisualController/ApplicationController/ApplicationController');
var ParamController             = require('../../editor/Controller/ParamController/ParamController');
var DatabaseController          = require('../../editor/Controller/DatabaseController/DatabaseController');
var PageController              = require('../../editor/Controller/VisualController/PageController/PageController');
var FormController              = require('../../editor/Controller/VisualController/FormController/FormController');
var PageLinkController          = require('../../editor/Controller/PageLinkController/PageLinkController');
var DataSourceController        = require('../../editor/Controller/DataSourceController/DataSourceController');
var KeyColumnController         = require('../../editor/Controller/KeyColumnController/KeyColumnController');
var ParentKeyColumnController   = require('../../editor/Controller/ParentKeyColumnController/ParentKeyColumnController');
var FieldController             = require('../../editor/Controller/VisualController/FieldController/FieldController');
var ControlController           = require('../../editor/Controller/VisualController/ControlController/ControlController');
var ApplicationFile             = require('../../editor/JsonFile/ApplicationFile/ApplicationFile');

qforms.set('editorClassCss', helper.getFilePathsSync(path.join(qforms.get('public')), 'editor/class', 'css'));
qforms.set('editorClassJs',  helper.getFilePathsSync(path.join(qforms.get('public')), 'editor/class', 'js'));

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
    if (config.get('editor')) {
        if (req.params.appDirName && req.params.appFileName) {
            // var route = req.params.appDirName + '/' + req.params.appFileName;
            var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
            fs.exists(appFilePath, function(exists) {
                if (exists) {
                    helper.getAppInfo(appFilePath, function(appInfo) {
                        var d = domain.create();
                        if (qforms.get('handleException') === 'true') {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function index(req, res, next, appInfo) {
    var appFile = new ApplicationFile(appInfo);
    appFile.init(function() {
        res.render('editor/view', {
            version        : req.app.get('version'),
            debug          : req.query.debug,
            commonStyleCss : req.app.get('commonStyleCss'),
            commonClassCss : req.app.get('commonClassCss'),
            commonClassJs  : req.app.get('commonClassJs'),
            editorClassCss : req.app.get('editorClassCss'),
            editorClassJs  : req.app.get('editorClassJs'),
            runAppLink     : '/view/' + appInfo.route + '?debug=1',
            appFileContent : appFile.content,
            appName        : appFile.getAttr('name')
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function action(req, res, next, appInfo) {
    if (controllers.indexOf(req.body.controller) !== -1) {
        if (actions.indexOf(req.body.action) !== -1) {
            var code = 'var ctrl = new {controller}Controller(appInfo);\
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
};