import { Editor } from '../Editor';
import { ColumnAttributes, ColumnScheme } from '../../../common/Scheme/ColumnScheme';
export type ColumnParams = Partial<ColumnAttributes> & {
    name: string;
};
export declare class ColumnEditor extends Editor<ColumnScheme> {
    static createData(params: ColumnParams): ColumnScheme;
    getColName(): string;
}
