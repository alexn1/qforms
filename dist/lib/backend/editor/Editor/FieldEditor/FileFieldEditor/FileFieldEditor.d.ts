import { FieldEditor } from '../FieldEditor';
declare class FileFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = FileFieldEditor;
