declare const FieldEditor: any;
declare class ImageFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = ImageFieldEditor;
