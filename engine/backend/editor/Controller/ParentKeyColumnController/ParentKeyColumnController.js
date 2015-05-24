'use strict';

module.exports = ParentKeyColumnController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms            = require('../../../qforms');
var Controller        = require('../Controller');
var ApplicationFile   = require('../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(ParentKeyColumnController, Controller);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParentKeyColumnController(appInfo) {
    ParentKeyColumnController.super_.prototype.constructor.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/ParentKeyColumnController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.page, function(pageEditor) {
            var parentKeyColumnData = pageEditor.pageFile.newFormDataSouceParentKeyColumn(params);
            pageEditor.pageFile.save(function() {
                callback(parentKeyColumnData);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            pageEditor.pageFile.setFormDataSourceParentKeyColumnAttr(params["form"], params['dataSource'], params["parentKeyColumn"], params["attr"], params["value"]);
            pageEditor.pageFile.save(function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.page, function(pageEditor) {
            pageEditor.pageFile.deleteFormDataSourceParentKeyColumn(params["form"], params["dataSource"], params['parentKeyColumn']);
            pageEditor.pageFile.save(function() {
                callback(null);
            });
        });
    });
};