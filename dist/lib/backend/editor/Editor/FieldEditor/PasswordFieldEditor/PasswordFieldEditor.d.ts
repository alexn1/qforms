declare const FieldEditor: any;
declare class PasswordFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = PasswordFieldEditor;
