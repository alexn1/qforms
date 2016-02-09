'use strict';

module.exports = ParentKeyColumnEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var server = require('../../../../server');

var EditorController = require('../EditorController');

util.inherits(ParentKeyColumnEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParentKeyColumnEditorController(appInfo) {
    ParentKeyColumnEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/ParentKeyColumnController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnEditorController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.page, function(pageEditor) {

            var formEditor = pageEditor.getForm(params.form);
            var parentKeyColumnData = formEditor.newDataSouceParentKeyColumn(params);
            pageEditor.save(function() {
                callback(parentKeyColumnData);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnEditorController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params['form']);
            formEditor.setDataSourceParentKeyColumnAttr(params['dataSource'], params['parentKeyColumn'], params['attr'], params['value']);
            pageEditor.save(function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnEditorController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params['form']);
            formEditor.deleteFormDataSourceParentKeyColumn(params['dataSource'], params['parentKeyColumn']);
            pageEditor.save(function() {
                callback(null);
            });
        });
    });
};