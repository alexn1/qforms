import { FormEditor } from '../FormEditor';
declare class RowFormEditor extends FormEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
        dataSources: any[];
        actions: any[];
        fields: any[];
    };
}
export = RowFormEditor;
