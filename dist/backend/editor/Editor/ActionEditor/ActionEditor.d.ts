import { Editor } from '../Editor';
import { ActionAttributes } from '../../../common/Attributes/ActionAttributes';
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
