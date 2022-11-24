import { FieldEditor } from '../FieldEditor';
declare class DateFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = DateFieldEditor;
