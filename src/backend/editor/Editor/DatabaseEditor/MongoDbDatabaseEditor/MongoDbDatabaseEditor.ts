import { DatabaseEditor } from '../DatabaseEditor';
import { Editor } from '../../Editor';

export class MongoDbDatabaseEditor extends DatabaseEditor {
    static createData(params) {
        if (!params.name) throw new Error('no name');
        return {
            '@class': 'MongoDbDatabase',
            '@attributes': {
                ...DatabaseEditor.createAttributes(params),
            },
            params: [...(params.params ? params.params.map(Editor.createItemData) : [])],
        };
    }
}
