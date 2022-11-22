declare const FieldEditor: any;
declare class TextAreaFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = TextAreaFieldEditor;
