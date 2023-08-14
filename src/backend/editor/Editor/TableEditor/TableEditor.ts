import { TableAttributes, TableItems, TableScheme } from '../../../common/Scheme/TableScheme';
import { Editor } from '../Editor';

export type TableParams = Partial<TableAttributes> &
    Partial<TableItems> & {
        name: string;
    };

export class TableEditor extends Editor<TableScheme> {
    static createData(params: TableParams): TableScheme {
        // debug('TableEditor.createData', params);
        return {
            '@class': 'Table',
            '@attributes': {
                name: params.name,
            },
            columns: [...(params.columns ? params.columns.map(Editor.createItemData) : [])],
        };
    }

    getColName() {
        return 'tables';
    }
}
