declare const FieldEditor: any;
declare class PhoneFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = PhoneFieldEditor;
