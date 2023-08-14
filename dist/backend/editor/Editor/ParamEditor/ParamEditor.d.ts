import { Editor } from '../Editor';
import { ParamAttributes, ParamScheme } from '../../../common/Scheme/ParamScheme';
export type ParamParams = Partial<ParamAttributes> & {
    name: string;
};
export declare class ParamEditor extends Editor<ParamScheme> {
    static createData(params: ParamParams): ParamScheme;
    getColName(): string;
}
