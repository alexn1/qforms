'use strict';

module.exports = SqlDataSourceController;

var util = require('util');
var path = require('path');

var helper               = require('../../../../common/helper');
var DataSourceController = require('../DataSourceController');
var FormController       = require('../../FormController/FormController');
var SqlDataAdapter       = require('../../../DataAdapter/SqlDataAdapter/SqlDataAdapter');

util.inherits(SqlDataSourceController, DataSourceController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataSourceController(data, parent) {
    SqlDataSourceController.super_.call(this, data, parent);
    this.dataAdapter = new SqlDataAdapter(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.create = function(data, parent, callback) {
    if (parent instanceof FormController) {
        var form = parent;
        var customClassFilePath = path.join(
            form.page.application.dirPath,
            'pages',
            form.page.name,
            'forms',
            form.name,
            'dataSources',
            data['@attributes'].name + '.backend.js'
        );
        helper.getFileContent(customClassFilePath, function(content) {
            if (content) {
                var customClass = eval(content);
                callback(new customClass(data, parent));
            } else {
                callback(new SqlDataSourceController(data, parent));
            }
        });
    } else {
        callback(new SqlDataSourceController(data, parent));
    }
};