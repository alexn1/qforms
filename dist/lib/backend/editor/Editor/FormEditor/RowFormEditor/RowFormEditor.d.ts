declare const FormEditor: any;
declare class RowFormEditor extends FormEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            caption: any;
            visible: any;
            newMode: any;
            backOnly: any;
        };
        dataSources: any[];
        actions: any[];
        fields: any[];
    };
}
export = RowFormEditor;
