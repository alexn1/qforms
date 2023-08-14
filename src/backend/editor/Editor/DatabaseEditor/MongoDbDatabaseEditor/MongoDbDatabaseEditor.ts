import { DatabaseEditor } from '../DatabaseEditor';
import { Editor } from '../../Editor';
import { DatabaseScheme } from '../../../../common/Scheme/DatabaseScheme';

import { DatabaseParams } from '../DatabaseEditor';

export class MongoDbDatabaseEditor extends DatabaseEditor {
    static createData(params: DatabaseParams): DatabaseScheme {
        if (!params.name) throw new Error('no name');
        return {
            '@class': 'MongoDbDatabase',
            '@attributes': {
                ...DatabaseEditor.createAttributes(params),
            },
            params: [...(params.params ? params.params.map(Editor.createItemData) : [])],
            tables: [...(params.tables ? params.tables.map(Editor.createItemData) : [])],
        };
    }
}
