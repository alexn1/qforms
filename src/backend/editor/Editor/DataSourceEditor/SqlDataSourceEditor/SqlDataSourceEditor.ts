import { DataSourceEditor } from '../DataSourceEditor';
import { Editor } from '../../Editor';
import {
    DataSourceItems,
    SqlDataSourceAttributes,
    SqlDataSourceScheme,
} from '../../../../common/Scheme/DataSourceScheme';

export type SqlDataSourceParams = Partial<SqlDataSourceAttributes> &
    DataSourceItems & {
        name: string;
    };

export class SqlDataSourceEditor extends DataSourceEditor<SqlDataSourceScheme> {
    static createData(params: SqlDataSourceParams): SqlDataSourceScheme {
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
