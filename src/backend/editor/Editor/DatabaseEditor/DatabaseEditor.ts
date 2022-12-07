import { Editor } from '../Editor';

export class DatabaseEditor extends Editor {
    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }
    getColName() {
        return 'databases';
    }
}
