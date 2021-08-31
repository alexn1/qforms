declare const FieldEditor: any;
declare class ComboBoxFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = ComboBoxFieldEditor;
