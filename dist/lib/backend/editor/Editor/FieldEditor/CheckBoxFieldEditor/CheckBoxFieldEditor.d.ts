declare const FieldEditor: any;
declare class CheckBoxFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = CheckBoxFieldEditor;
