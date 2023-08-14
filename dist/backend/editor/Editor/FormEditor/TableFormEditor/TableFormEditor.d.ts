import { FormEditor } from '../FormEditor';
import { FormItems, TableFormAttributes, TableFormScheme } from '../../../../common/Scheme/FormScheme';
export type TableFormParams = Partial<TableFormAttributes> & Partial<FormItems> & {
    name: string;
};
export declare class TableFormEditor extends FormEditor<TableFormScheme> {
    static createData(params: TableFormParams): TableFormScheme;
}
