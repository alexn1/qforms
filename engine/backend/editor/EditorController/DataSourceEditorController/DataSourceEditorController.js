'use strict';

module.exports = DataSourceEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms           = require('../../../qforms');
var EditorController = require('../EditorController');
var ApplicationFile  = require('../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(DataSourceEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceEditorController(appInfo) {
    DataSourceEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/DataSourceController/view'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.page) {
            appEditor.getPageByFileName(params.page, function(pageEditor) {
                if (params.form) {
                    // form data source
                    var dataSourceData = pageEditor.pageFile.newFormDataSource(params);
                    pageEditor.pageFile.save(function() {
                        callback(dataSourceData);
                    });
                } else {
                    // page data source
                    var dataSourceData = pageEditor.pageFile.newDataSource(params);
                    pageEditor.pageFile.save(function() {
                        callback(dataSourceData);
                    });
                }
            });
        } else {
            // app data source
            var dataSourceData = appEditor.appFile.newDataSource(params);
            appEditor.appFile.save(function() {
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
                    pageEditor.pageFile.deleteFormDataSource(params['form'], params['dataSource']);
                    pageEditor.pageFile.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.pageFile.deleteDataSource(params['dataSource']);
                    pageEditor.pageFile.save(function() {
                        callback(null);
                    });
                }
            });
        } else {
            // app data source
            appEditor.appFile.deleteDataSource(params.dataSource);
            appEditor.appFile.save(function() {
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
                    pageEditor.pageFile.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.moveDataSourceUp(params.dataSource);
                    pageEditor.pageFile.save(function() {
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
                    pageEditor.pageFile.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.moveDataSourceDown(params.dataSource);
                    pageEditor.pageFile.save(function() {
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
                    pageEditor.pageFile.setFormDataSourceAttr(params['form'], params['dataSource'], params['attr'], params['value']);
                    pageEditor.pageFile.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.pageFile.setDataSourceAttr(params['dataSource'], params['attr'], params['value']);
                    pageEditor.pageFile.save(function() {
                        callback(null);
                    });
                }
            });
        } else {
            // app data source
            appEditor.appFile.setDataSourceAttr(params.dataSource, params.attr, params.value);
            appEditor.appFile.save(function() {
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
            case 'QueryView.html':
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