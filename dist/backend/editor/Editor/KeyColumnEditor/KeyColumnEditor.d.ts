import { Editor } from '../Editor';
import { KeyColumnScheme } from '../../../common/Scheme/KeyColumnScheme';
export type KeyColumnParams = Partial<KeyColumnScheme> & {
    name: string;
};
export declare class KeyColumnEditor extends Editor<KeyColumnScheme> {
    static createData(params: KeyColumnParams): KeyColumnScheme;
    getColName(): string;
}
