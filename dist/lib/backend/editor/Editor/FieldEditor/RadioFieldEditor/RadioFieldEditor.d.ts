declare const FieldEditor: any;
declare class RadioFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = RadioFieldEditor;
