import { Editor } from '../Editor';
export declare class KeyColumnEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
        };
    };
    getColName(): string;
}
