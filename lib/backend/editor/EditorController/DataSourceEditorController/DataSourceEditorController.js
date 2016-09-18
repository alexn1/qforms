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
DataSourceEditorController.prototype._new = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        if (params.page) {
            return appEditor.getPageByFileName2(params.page).then(function (pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params.form);
                    var dataSourceEditor = formEditor.newDataSource(params);
                    return pageEditor.save2().then(function () {
                        return dataSourceEditor.getData();
                    });
                } else {
                    // page data source
                    var dataSourceData = pageEditor.newDataSource(params);
                    return pageEditor.save2().then(function () {
                        return dataSourceData;
                    });
                }
            });
        } else {
            // app data source
            var dataSourceData = appEditor.newDataSource(params);
            return appEditor.save2().then(function () {
                return dataSourceData;
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.delete = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        if (params.page) {
            return appEditor.getPageByFileName2(params.page).then(function (pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params['form']);
                    formEditor.deleteFormDataSource(params['dataSource']);
                    return pageEditor.save2().then(function () {
                        return null;
                    });
                } else {
                    // page data source
                    pageEditor.deleteDataSource(params['dataSource']);
                    return pageEditor.save2().then(function () {
                        return null;
                    });
                }
            });
        } else {
            // app data source
            appEditor.deleteDataSource(params.dataSource);
            return appEditor.save2().then(function () {
                return null;
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.moveUp = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        if (params.page) {
            return appEditor.getPageByFileName2(params.page).then(function (pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params.form);
                    formEditor.moveDataSourceUp(params.dataSource);
                    return pageEditor.save2().then(function () {
                        return null;
                    });
                } else {
                    // page data source
                    pageEditor.moveDataSourceUp(params.dataSource);
                    return pageEditor.save2().then(function () {
                        return null;
                    });
                }
            });
        } else {
            // app data source
            appEditor.moveDataSourceUp(params.dataSource);
            return appEditor.appFile.save2().then(function () {
                return null;
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.moveDown = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        if (params.page) {
            return appEditor.getPageByFileName2(params.page).then(function (pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params.form);
                    formEditor.moveDataSourceDown(params.dataSource);
                    return pageEditor.save2().then(function () {
                        return null;
                    });
                } else {
                    // page data source
                    pageEditor.moveDataSourceDown(params.dataSource);
                    return pageEditor.save2().then(function () {
                        return null;
                    });
                }
            });
        } else {
            // app data source
            appEditor.moveDataSourceDown(params.dataSource);
            return appEditor.appFile.save2().then(function () {
                return null;
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.save = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        if (params.pageFileName) {
            return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
                if (params.form) {
                    // form data source
                    var formEditor = pageEditor.getForm(params.form);
                    formEditor.setDataSourceAttr(params['dataSource'], params['attr'], params['value']);
                    return pageEditor.save2().then(function () {
                        return null;
                    });
                } else {
                    // page data source
                    pageEditor.setDataSourceAttr(params['dataSource'], params['attr'], params['value']);
                    return pageEditor.save2().then(function () {
                        return null;
                    });
                }
            });
        } else {
            // app data source
            appEditor.setDataSourceAttr(params.dataSource, params.attr, params.value);
            return appEditor.save2().then(function () {
                return null;
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.getDataSourceEditor2 = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        if (params.pageFileName) {
            return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
                if (params.form) {
                    var formEditor = pageEditor.getForm(params.form);
                    var dataSourceEditor = formEditor.getDataSource(params.dataSource);
                    return dataSourceEditor;
                } else {
                    var dataSourceEditor = pageEditor.getDataSource(params.dataSource);
                    return dataSourceEditor;
                }
            });
        } else {
            var dataSourceEditor = appEditor.getDataSource(params.dataSource);
            return dataSourceEditor;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.getView = function(params) {
    var self = this;
    return DataSourceEditorController.super_.prototype.getView.call(this, params).then(function(result) {
        switch (params.view) {
            case 'QueryView.ejs':
                return self.getDataSourceEditor2(params).then(function (dataSourceEditor) {
                    return dataSourceEditor.getCustomFile2('backend.js').then(function (backendJs) {
                        result.data.backendJs = backendJs;
                        return result;
                    });
                });
                break;
            default:
                return result;
                break;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.saveController = function(params) {
    var self = this;
    return self.getDataSourceEditor2(params).then(function (dataSourceEditor) {
        return dataSourceEditor.saveCustomFile2('backend.js', params.text).then(function () {
            return null;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditorController.prototype.createController = function(params) {
    var self = this;
    return self.getDataSourceEditor2(params).then(function (dataSourceEditor) {
        return dataSourceEditor.createBackendJs2(params).then(function (backendJs) {
            return {
                backendJs: backendJs
            };
        });
    });
};