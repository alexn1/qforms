import { Editor } from '../Editor';
import { KeyColumnScheme } from '../../../common/Scheme/KeyColumnScheme';

export type KeyColumnParams = Partial<KeyColumnScheme> & {
    name: string;
};

export class KeyColumnEditor extends Editor<KeyColumnScheme> {
    static createData(params: KeyColumnParams): KeyColumnScheme {
        if (!params.name) throw new Error('no name');
        return {
            '@class': 'KeyColumn',
            '@attributes': {
                name: params.name,
            },
        };
    }

    getColName() {
        return 'keyColumns';
    }
}
