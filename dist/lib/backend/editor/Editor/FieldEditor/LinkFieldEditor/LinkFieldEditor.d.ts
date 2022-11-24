import { FieldEditor } from '../FieldEditor';
declare class LinkFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
    };
}
export = LinkFieldEditor;
