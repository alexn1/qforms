declare const FieldEditor: any;
declare class TimeFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = TimeFieldEditor;
