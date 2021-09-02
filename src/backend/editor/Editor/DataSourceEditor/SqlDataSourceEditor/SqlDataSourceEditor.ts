const DataSourceEditor = require('../DataSourceEditor');
const Editor = require('../../Editor');

class SqlDataSourceEditor extends DataSourceEditor {
    static createData(params): any {
        return {
            '@class'     : 'SqlDataSource',
            '@attributes': {
                name                : params.name,
                database            : params.database      ? params.database      : 'default',
                table               : params.table         ? params.table         :        '',
                singleQuery         : params.singleQuery   ? params.singleQuery   :        '',
                multipleQuery       : params.multipleQuery ? params.multipleQuery :        '',
                countQuery          : params.countQuery    ? params.countQuery    :        '',
                limit               : params.limit         ? params.limit         :        '',
            },
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(Editor.createItemData) : [])
            ],
        };
    }
}

export = SqlDataSourceEditor;
