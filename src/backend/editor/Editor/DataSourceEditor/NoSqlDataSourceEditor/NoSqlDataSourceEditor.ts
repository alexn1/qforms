import { DataSourceEditor } from '../DataSourceEditor';
import { Editor } from '../../Editor';

export class NoSqlDataSourceEditor extends DataSourceEditor {
    static createData(params): any {
        return {
            '@class': 'NoSqlDataSource',
            '@attributes': {
                ...DataSourceEditor.createAttributes(params),
            },
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(Editor.createItemData) : []),
            ],
        };
    }
}
