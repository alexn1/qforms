declare const FieldEditor: any;
declare class TextBoxFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = TextBoxFieldEditor;
