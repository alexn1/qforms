import { Editor } from '../Editor';
export interface ActionAttributes {
    name: string;
    caption: string;
}
export declare class ActionEditor extends Editor {
    static createData(params: ActionAttributes): {
        '@class': string;
        '@attributes': {
            name: string;
            caption: string;
        };
    };
    getColName(): string;
}
