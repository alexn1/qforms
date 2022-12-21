import { Editor } from '../Editor';

export class DatabaseEditor extends Editor {
    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }
    static createAttributes(params): any {
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
