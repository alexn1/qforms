"use strict"

module.exports = SqlDataSource;

var util = require('util');
var path = require('path');

var helper         = require('../../../../common/helper');
var DataSource     = require('../DataSource');
var Form           = require('../../Form/Form');
var SqlDataAdapter = require('../../../DataAdapter/SqlDataAdapter/SqlDataAdapter');

util.inherits(SqlDataSource, DataSource);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataSource(data, parent) {
    SqlDataSource.super_.call(this, data, parent);
    this.dataAdapter = new SqlDataAdapter(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.create = function(data, parent, callback) {
    if (parent instanceof Form) {
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
                callback(new SqlDataSource(data, parent));
            }
        });
    } else {
        callback(new SqlDataSource(data, parent));
    }
};