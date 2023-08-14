import { FormEditor } from '../FormEditor';
import { FormItems, RowFormAttributes, RowFormScheme } from '../../../../common/Scheme/FormScheme';
export type RowFormParams = Partial<RowFormAttributes> & Partial<FormItems> & {
    name: string;
};
export declare class RowFormEditor extends FormEditor<RowFormScheme> {
    static createData(params: RowFormParams): RowFormScheme;
}
