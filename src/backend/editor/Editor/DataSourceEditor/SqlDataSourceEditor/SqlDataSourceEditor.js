const DataSourceEditor = require('../DataSourceEditor');

class SqlDataSourceEditor extends DataSourceEditor {

    static createData(params) {
        return {
            '@class'     : 'SqlDataSource',
            '@attributes': {
                name                : params.name,
                // dumpFirstRowToParams: 'false',
                database            : params.database      ? params.database      : 'default',
                table               : params.table         ? params.table         :        '',
                singleQuery         : params.singleQuery   ? params.singleQuery   :        '',
                multipleQuery       : params.multipleQuery ? params.multipleQuery :        '',
                countQuery          : params.countQuery    ? params.countQuery    :        '',
                limit               : params.limit         ? params.limit         :        '',
                // insertNewKey        :'false'
            }
        };
    }

}

module.exports = SqlDataSourceEditor;