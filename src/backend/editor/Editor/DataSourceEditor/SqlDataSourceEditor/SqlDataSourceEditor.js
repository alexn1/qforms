'use strict';

const DataSourceEditor = require('../DataSourceEditor');

class SqlDataSourceEditor extends DataSourceEditor {

    static create(params) {
        const data = {
            '@class'     : 'SqlDataSource',
            '@attributes': {
                name                : params.name,
                database            : params.database      ? params.database      : 'default',
                table               : params.table         ? params.table         :        '',
                query               : params.query         ? params.query         :        '',
                singleQuery         : params.singleQuery   ? params.singleQuery   :        '',
                multipleQuery       : params.multipleQuery ? params.multipleQuery :        '',
                countQuery          : params.countQuery    ? params.countQuery    :        '',
                limit               : params.limit         ? params.limit         :        '',
                insertNewKey        :'false',
                dumpFirstRowToParams:'false'
            }
        };
        return data;
    }

}

module.exports = SqlDataSourceEditor;