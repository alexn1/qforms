import { DataSourceEditor } from '../DataSourceEditor';
import { Editor } from '../../Editor';

export class SqlDataSourceEditor extends DataSourceEditor {
    static createData(params): any {
        return {
            '@class': 'SqlDataSource',
            '@attributes': {
                ...DataSourceEditor.createAttributes(params),
                singleQuery: params.singleQuery ? params.singleQuery : '',
                multipleQuery: params.multipleQuery ? params.multipleQuery : '',
                countQuery: params.countQuery ? params.countQuery : '',
                limit: params.limit ? params.limit : '',
            },
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(Editor.createItemData) : []),
            ],
        };
    }
}
