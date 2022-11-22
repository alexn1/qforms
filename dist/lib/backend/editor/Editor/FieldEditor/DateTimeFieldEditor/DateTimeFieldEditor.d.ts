declare const FieldEditor: any;
declare class DateTimeFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = DateTimeFieldEditor;
