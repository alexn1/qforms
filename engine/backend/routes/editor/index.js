'use strict';

var config = require('config');
var path   = require('path');
var fs     = require('fs');
var helper = require('../../common/helper');
var qforms = require('../../qforms');
var domain = require('domain');

var ApplicationEditorController       = require('../../editor/EditorController/VisualEditorController/ApplicationEditorController/ApplicationEditorController');
var ParamEditorController             = require('../../editor/EditorController/ParamEditorController/ParamEditorController');
var DatabaseEditorController          = require('../../editor/EditorController/DatabaseEditorController/DatabaseEditorController');
var PageEditorController              = require('../../editor/EditorController/VisualEditorController/PageEditorController/PageEditorController');
var FormEditorController              = require('../../editor/EditorController/VisualEditorController/FormEditorController/FormEditorController');
var PageLinkEditorController          = require('../../editor/EditorController/PageLinkEditorController/PageLinkEditorController');
var DataSourceEditorController        = require('../../editor/EditorController/DataSourceEditorController/DataSourceEditorController');
var KeyColumnEditorController         = require('../../editor/EditorController/KeyColumnEditorController/KeyColumnEditorController');
var ParentKeyColumnEditorController   = require('../../editor/EditorController/ParentKeyColumnEditorController/ParentKeyColumnEditorController');
var FieldEditorController             = require('../../editor/EditorController/VisualEditorController/FieldEditorController/FieldEditorController');
var ControlEditorController           = require('../../editor/EditorController/VisualEditorController/ControlEditorController/ControlEditorController');
var JsonFile             = require('../../editor/JsonFile/JsonFile');

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
    var appFile = new JsonFile(appInfo.filePath);
    appFile.read(function() {
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
            var code = 'var ctrl = new {controller}EditorController(appInfo);\
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