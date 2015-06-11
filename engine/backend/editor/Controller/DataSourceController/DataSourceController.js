'use strict';

module.exports = DataSourceController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms            = require('../../../qforms');
var Controller        = require('../Controller');
var ApplicationFile   = require('../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(DataSourceController, Controller);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceController(appInfo) {
    DataSourceController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DataSourceController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype._new = function(params, callback) {
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
                    callback();
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
DataSourceController.prototype.delete = function(params, callback) {
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
                    callback();
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
DataSourceController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.page) {
            appEditor.getPageByFileName(params.pageFileName,function(pageEditor) {
                if (params.form) {
                    // form data source
                    pageEditor.pageFile.setFormDataSourceAttr(params["form"], params['dataSource'], params["attr"], params["value"]);
                    pageEditor.pageFile.save(function() {
                        callback(null);
                    });
                } else {
                    // page data source
                    callback();
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