import { DatabaseEditor } from '../DatabaseEditor';
import { Editor } from '../../Editor';

export class PostgreSqlDatabaseEditor extends DatabaseEditor {
    static createData(params) {
        if (!params.name) throw new Error('no name');
        return {
            '@class': 'PostgreSqlDatabase',
            '@attributes': {
                ...DatabaseEditor.createAttributes(params),
            },
            params: [...(params.params ? params.params.map(Editor.createItemData) : [])],
            tables: [...(params.tables ? params.tables.map(Editor.createItemData) : [])],
        };
    }
}
