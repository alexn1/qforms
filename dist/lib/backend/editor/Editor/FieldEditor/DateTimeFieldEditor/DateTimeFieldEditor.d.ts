import { FieldEditor } from '../FieldEditor';
declare class DateTimeFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = DateTimeFieldEditor;
