declare const FieldEditor: any;
declare class DatePickerFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = DatePickerFieldEditor;
