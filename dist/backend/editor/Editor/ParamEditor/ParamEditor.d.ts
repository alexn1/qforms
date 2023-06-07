import { Editor } from '../Editor';
export declare class ParamEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            value: string;
        };
    };
    getColName(): string;
}
