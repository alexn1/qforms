import { FieldEditor } from '../FieldEditor';
declare class LabelFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = LabelFieldEditor;
