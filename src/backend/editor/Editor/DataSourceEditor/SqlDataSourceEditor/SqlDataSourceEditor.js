'use strict';

var util = require('util');

var DataSourceEditor = require('../DataSourceEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class SqlDataSourceEditor extends DataSourceEditor {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(parent, name, data) {
        super(parent, name, data);
        var self = this;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static create(params) {
        var data = {
            '@class'     : 'SqlDataSource',
            '@attributes': {
                name                : params.name,
                database            : params['database']   ? params['database']   : 'default',
                table               : params['table']      ? params['table']      :        '',
                query               : params['query']      ? params['query']      :        '',
                limit               : params['limit']      ? params['limit']      :        '',
                countQuery          : params['countQuery'] ? params['countQuery'] :        '',
                insertNewKey        :'false',
                dumpFirstRowToParams:'false'
            }
        };
        return data;
    }

}

module.exports = SqlDataSourceEditor;