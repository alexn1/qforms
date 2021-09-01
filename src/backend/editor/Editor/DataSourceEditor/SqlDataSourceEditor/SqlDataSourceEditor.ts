const DataSourceEditor = require('../DataSourceEditor');
import KeyColumnEditor from '../../KeyColumnEditor/KeyColumnEditor';

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
                ...(params.keyColumns ? params.keyColumns.map(keyColumnParams => KeyColumnEditor.createData(keyColumnParams)) : [])
            ],
        };
    }
}

export = SqlDataSourceEditor;
