declare const FieldEditor: any;
declare class DateFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = DateFieldEditor;
