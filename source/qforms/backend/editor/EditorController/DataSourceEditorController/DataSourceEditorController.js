'use strict';

module.exports = DataSourceEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var server = require('../../../../server');


var EditorController = require('../EditorController');

util.inherits(DataSourceEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceEditorController(appInfo) {
    DataSourceEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/DataSourceController/view'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.page) {
            appEditor.getPageByFileName(params.page, function(pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params.form);
                    var dataSourceEditor = formEditor.newDataSource(params);
                    pageEditor.save(function() {
                        callback(dataSourceEditor.getData());
                    });
                } else {
                    // page data source
                    var dataSourceData = pageEditor.newDataSource(params);
                    pageEditor.save(function() {
                        callback(dataSourceData);
                    });
                }
            });
        } else {
            // app data source
            var dataSourceData = appEditor.newDataSource(params);
            appEditor.save(function() {
                callback(dataSourceData);
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.page) {
            appEditor.getPageByFileName(params.page,function(pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params['form']);
                    formEditor.deleteFormDataSource(params['dataSource']);
                    pageEditor.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.deleteDataSource(params['dataSource']);
                    pageEditor.save(function() {
                        callback(null);
                    });
                }
            });
        } else {
            // app data source
            appEditor.deleteDataSource(params.dataSource);
            appEditor.save(function() {
                callback(null);
            });
        }
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.moveUp = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.page) {
            appEditor.getPageByFileName(params.page, function(pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params.form);
                    formEditor.moveDataSourceUp(params.dataSource);
                    pageEditor.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.moveDataSourceUp(params.dataSource);
                    pageEditor.save(function() {
                        callback(null);
                    });
                }
            });
        } else {
            // app data source
            appEditor.moveDataSourceUp(params.dataSource);
            appEditor.appFile.save(function() {
                callback(null);
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.moveDown = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.page) {
            appEditor.getPageByFileName(params.page, function(pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params.form);
                    formEditor.moveDataSourceDown(params.dataSource);
                    pageEditor.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.moveDataSourceDown(params.dataSource);
                    pageEditor.save(function() {
                        callback(null);
                    });
                }
            });
        } else {
            // app data source
            appEditor.moveDataSourceDown(params.dataSource);
            appEditor.appFile.save(function() {
                callback(null);
            });
        }
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.pageFileName) {
            appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params.form);
                    formEditor.setDataSourceAttr(params['dataSource'], params['attr'], params['value']);
                    pageEditor.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.setDataSourceAttr(params['dataSource'], params['attr'], params['value']);
                    pageEditor.save(function() {
                        callback(null);
                    });
                }
            });
        } else {
            // app data source
            appEditor.setDataSourceAttr(params.dataSource, params.attr, params.value);
            appEditor.save(function() {
                callback(null);
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.getDataSourceEditor = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.pageFileName) {
            appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
                if (params.form) {
                    var formEditor = pageEditor.getForm(params.form);
                    var dataSourceEditor = formEditor.getDataSource(params.dataSource);
                    callback(dataSourceEditor);
                } else {
                    var dataSourceEditor = pageEditor.getDataSource(params.dataSource);
                    callback(dataSourceEditor);
                }
            });
        } else {
            var dataSourceEditor = appEditor.getDataSource(params.dataSource);
            callback(dataSourceEditor);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.getView = function(params, callback) {
    var self = this;
    DataSourceEditorController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'QueryView.ejs':
                self.getDataSourceEditor(params, function(dataSourceEditor) {
                    dataSourceEditor.getCustomFile('backend.js', function(backendJs) {
                        result.data.backendJs = backendJs;
                        callback(result);
                    });
                });
                break;
            default:
                callback(result);
                break;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.saveController = function(params, callback) {
    this.getDataSourceEditor(params, function(dataSourceEditor) {
        dataSourceEditor.saveCustomFile('backend.js', params.text, function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.createController = function(params, callback) {
    this.getDataSourceEditor(params, function(dataSourceEditor) {
        dataSourceEditor.createBackendJs(params, function(backendJs) {
            callback({
                backendJs: backendJs
            });
        });
    });
};