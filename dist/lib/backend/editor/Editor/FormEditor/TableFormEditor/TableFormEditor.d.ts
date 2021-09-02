declare const FormEditor: any;
declare class TableFormEditor extends FormEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            caption: any;
            visible: any;
            editMethod: any;
            itemEditPage: any;
            itemCreatePage: any;
            newRowMode: any;
            deleteRowMode: any;
            refreshButton: any;
        };
        dataSources: any[];
        actions: any[];
        fields: any[];
    };
}
export = TableFormEditor;
