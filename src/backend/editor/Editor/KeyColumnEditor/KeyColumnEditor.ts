import {Editor} from '../Editor';

export class KeyColumnEditor extends Editor {
    static createData(params) {
        if (!params.name) throw new Error('no name');
        return {
            '@class'     : 'KeyColumn',
            '@attributes': {
                'name': params.name
            }
        };
    }
    getColName() {
        return 'keyColumns';
    }
}
