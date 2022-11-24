import { FieldEditor } from '../FieldEditor';
declare class TextBoxFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = TextBoxFieldEditor;
