declare const FieldEditor: any;
declare class LabelFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = LabelFieldEditor;
