import { FieldEditor } from '../FieldEditor';
declare class TextAreaFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = TextAreaFieldEditor;
