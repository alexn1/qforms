'use strict';

module.exports = KeyColumnController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms            = require('../../../qforms');
var Controller        = require('../Controller');
var ApplicationFile   = require('../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(KeyColumnController, Controller);

////////////////////////////////////////////////////////////////////////////////////////////////////
function KeyColumnController(appInfo) {
    KeyColumnController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/KeyColumnController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        if (params.page) {
            appEditor.getPageByFileName(params.page, function(pageEditor) {
                if (params.form) {
                    var keyColumnData = pageEditor.pageFile.newFormDataSouceKeyColumn(params);
                    pageEditor.pageFile.save(function() {
                        callback(keyColumnData);
                    });
                } else {
                    var dataSourceEditor = pageEditor.getDataSource(params.dataSource);
                    var keyColumnData = dataSourceEditor.newKeyColumn(params);
                    pageEditor.pageFile.save(function() {
                        callback(keyColumnData);
                    });
                }
            });
        } else {
            var dataSourceEditor = appEditor.getDataSource(params.dataSource);
            var keyColumnData = dataSourceEditor.newKeyColumn(params);
            appEditor.appFile.save(function() {
                callback(keyColumnData);
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            pageEditor.pageFile.setFormDataSourceKeyColumnAttr(params["form"], params['dataSource'], params["keyColumn"], params["attr"], params["value"]);
            pageEditor.pageFile.save(function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.page, function(pageEditor) {
            pageEditor.pageFile.deleteFormDataSourceKeyColumn(params["form"], params["dataSource"], params['keyColumn']);
            pageEditor.pageFile.save(function() {
                callback(null);
            });
        });
    });
};