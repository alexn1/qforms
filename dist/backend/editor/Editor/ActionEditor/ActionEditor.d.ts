import { Editor } from '../Editor';
import { ActionAttributes, ActionScheme } from '../../../common/Scheme/ActionScheme';
export type ActionParams = Partial<ActionAttributes> & {
    name: string;
};
export declare class ActionEditor extends Editor<ActionScheme> {
    static createData(params: ActionParams): ActionScheme;
    getColName(): string;
}
