import { Editor } from '../Editor';

export class TableEditor extends Editor {
    static createData(params) {
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
