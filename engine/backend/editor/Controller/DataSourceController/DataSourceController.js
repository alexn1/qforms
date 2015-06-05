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
        appEditor.getPageByFileName(params.page,function(pageEditor) {
            var dataSourceData = pageEditor.pageFile.newFormDataSource(params);
            pageEditor.pageFile.save(function() {
                callback(dataSourceData);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName,function(pageEditor) {
            pageEditor.pageFile.setFormDataSourceAttr(params["form"], params['dataSource'], params["attr"], params["value"]);
            pageEditor.pageFile.save(function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.page,function(pageEditor) {
            pageEditor.pageFile.deleteFormDataSource(params["form"], params["dataSource"]);
            pageEditor.pageFile.save(function() {
                callback(null);
            });
        });
    });
};