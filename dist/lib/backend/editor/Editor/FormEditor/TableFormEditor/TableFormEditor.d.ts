declare const FormEditor: any;
declare class TableFormEditor extends FormEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
        dataSources: any[];
        actions: any[];
        fields: any[];
    };
}
export = TableFormEditor;
