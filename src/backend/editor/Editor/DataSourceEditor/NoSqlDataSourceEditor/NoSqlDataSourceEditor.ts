import { DataSourceEditor } from '../DataSourceEditor';
import { Editor } from '../../Editor';
import {
    DataSourceItems,
    NoSqlDataSourceAttributes,
    NoSqlDataSourceScheme,
} from '../../../../common/Scheme/DataSourceScheme';

export type NoSqlDataSourceParams = Partial<NoSqlDataSourceAttributes> &
    Partial<DataSourceItems> & {
        name: string;
    };

export class NoSqlDataSourceEditor extends DataSourceEditor<NoSqlDataSourceScheme> {
    static createData(params: NoSqlDataSourceParams): NoSqlDataSourceScheme {
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
