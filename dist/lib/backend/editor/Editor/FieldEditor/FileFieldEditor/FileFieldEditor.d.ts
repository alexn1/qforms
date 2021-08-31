declare const FieldEditor: any;
declare class FileFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = FileFieldEditor;
