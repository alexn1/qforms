import {
    DatabaseAttributes,
    DatabaseItems,
    DatabaseScheme,
} from '../../../common/Scheme/DatabaseScheme';
import { Editor } from '../Editor';

export type DatabaseParams = Partial<DatabaseAttributes> &
    Partial<DatabaseItems> & {
        name: string;
    };

export class DatabaseEditor extends Editor<DatabaseScheme> {
    static createData(params: DatabaseParams): DatabaseScheme {
        throw new Error('DatabaseEditor.createData not implemented');
    }

    static createAttributes(params: DatabaseParams): DatabaseAttributes {
        if (!params.name) throw new Error('no name');
        return {
            name: params.name,
            modelClass: params.modelClass !== undefined ? params.modelClass : '',
        };
    }

    getColName() {
        return 'databases';
    }
}
