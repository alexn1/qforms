'use strict';

module.exports = SqlDataSourceEditor;

var util = require('util');

var DataSourceEditor = require('../DataSourceEditor');

util.inherits(SqlDataSourceEditor, DataSourceEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataSourceEditor(parent, name) {
    SqlDataSourceEditor.super_.call(this, parent, name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceEditor.create = function(params) {
    var data = {
        '@class':'SqlDataSource',
        '@attributes': {
            name                : params.name,
            database            : params['database'] ? params['database'] : 'default',
            table               : params['table']    ? params['table'] : '',
            query               : params['query']    ? params['query'] : '',
            insertNewKey        :'false',
            dumpFirstRowToParams:'false'
        }
    };
    return data; 
};