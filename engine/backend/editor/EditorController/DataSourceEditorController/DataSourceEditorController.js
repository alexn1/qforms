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
        'editor/class/Controller/ModelController/DataSourceController'
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
                    pageEditor.pageFile.deleteFormDataSource(params["form"], params["dataSource"]);
                    pageEditor.pageFile.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.pageFile.deleteDataSource(params["dataSource"]);
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
DataSourceEditorController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.pageFileName) {
            appEditor.getPageByFileName(params.pageFileName,function(pageEditor) {
                if (params.form) {
                    // form data source
                    pageEditor.pageFile.setFormDataSourceAttr(params["form"], params['dataSource'], params["attr"], params["value"]);
                    pageEditor.pageFile.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    pageEditor.pageFile.setDataSourceAttr(params['dataSource'], params["attr"], params["value"]);
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