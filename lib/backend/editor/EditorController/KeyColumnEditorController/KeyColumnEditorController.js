'use strict';

module.exports = KeyColumnEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var server           = require('../../../../server');
var EditorController = require('../EditorController');

util.inherits(KeyColumnEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function KeyColumnEditorController(appInfo) {
    var self = this;
    KeyColumnEditorController.super_.call(self, appInfo);
    self.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/KeyColumnController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnEditorController.prototype._new = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        if (params.page) {
            return appEditor.getPageByFileName2(params.page).then(function (pageEditor) {
                if (params.form) {
                    var formEditor = pageEditor.getForm(params.form);
                    var keyColumnData = formEditor.newDataSouceKeyColumn(params);
                    return pageEditor.save().then(function () {
                        return keyColumnData;
                    });
                } else {
                    var dataSourceEditor = pageEditor.getDataSource(params.dataSource);
                    var keyColumnData = dataSourceEditor.newKeyColumn(params);
                    return pageEditor.save().then(function () {
                        return keyColumnData;
                    });
                }
            });
        } else {
            var dataSourceEditor = appEditor.getDataSource(params.dataSource);
            var keyColumnData = dataSourceEditor.newKeyColumn(params);
            return appEditor.appFile.save().then(function () {
                return keyColumnData;
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnEditorController.prototype.save = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.setDataSourceKeyColumnAttr(params['dataSource'], params['keyColumn'], params['attr'], params['value']);
            return pageEditor.save().then(function () {
                return null;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnEditorController.prototype.delete = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.page).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params['form']);
            formEditor.deleteFormDataSourceKeyColumn(params['dataSource'], params['keyColumn']);
            return pageEditor.save().then(function() {
                return null;
            });
        });
    });
};