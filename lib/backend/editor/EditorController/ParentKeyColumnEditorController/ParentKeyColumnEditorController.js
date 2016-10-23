'use strict';

module.exports = ParentKeyColumnEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var server           = require('../../../../server');
var EditorController = require('../EditorController');

util.inherits(ParentKeyColumnEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParentKeyColumnEditorController(appInfo) {
    var self = this;
    ParentKeyColumnEditorController.super_.call(self, appInfo);
    self.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/ParentKeyColumnController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnEditorController.prototype._new = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName(params.page).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            var parentKeyColumnData = formEditor.newDataSouceParentKeyColumn(params);
            return pageEditor.save().then(function () {
                return parentKeyColumnData;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnEditorController.prototype.save = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function (appEditor) {
        return appEditor.getPageByFileName(params.pageFileName).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params['form']);
            formEditor.setDataSourceParentKeyColumnAttr(params['dataSource'], params['parentKeyColumn'], params['attr'], params['value']);
            return pageEditor.save().then(function () {
                return null;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnEditorController.prototype.delete = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        appEditor.getPageByFileName(params.page).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params['form']);
            formEditor.deleteFormDataSourceParentKeyColumn(params['dataSource'], params['parentKeyColumn']);
            return pageEditor.save().then(function() {
                return null;
            });
        });
    });
};