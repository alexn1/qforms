import { TableAttributes, TableItems, TableScheme } from '../../../common/Scheme/TableScheme';
import { Editor } from '../Editor';
export type TableParams = Partial<TableAttributes> & Partial<TableItems> & {
    name: string;
};
export declare class TableEditor extends Editor<TableScheme> {
    static createData(params: TableParams): TableScheme;
    getColName(): string;
}
