declare const FormEditor: any;
declare class TableFormEditor extends FormEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            caption: any;
            visible: any;
            editMethod: string;
            itemEditPage: string;
            itemCreatePage: string;
            newRowMode: string;
            deleteRowMode: string;
            refreshButton: string;
        };
        dataSources: any[];
        actions: any[];
        fields: any[];
    };
}
export = TableFormEditor;
