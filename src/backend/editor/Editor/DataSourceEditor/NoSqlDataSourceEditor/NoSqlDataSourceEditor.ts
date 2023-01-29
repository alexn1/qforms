import { DataSourceEditor } from '../DataSourceEditor';
import { Editor } from '../../Editor';

export class NoSqlDataSourceEditor extends DataSourceEditor {
    static createData(params): any {
        return {
            '@class': 'NoSqlDataSource',
            '@attributes': {
                ...DataSourceEditor.createAttributes(params),
                selectQuery: params.selectQuery ? params.selectQuery : '',
                countQuery: params.countQuery ? params.countQuery : '',
                limit: params.limit ? params.limit : '',
            },
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(Editor.createItemData) : []),
            ],
        };
    }
}
