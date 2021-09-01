declare const Editor: any;
import FieldEditor from '../FieldEditor/FieldEditor';
declare class FormEditor extends Editor {
    static createData(params: any): any;
    newFieldData(params: any): any;
    moveFieldUp(params: any): Promise<string>;
    moveFieldDown(params: any): Promise<string>;
    createFieldEditor(name: any): FieldEditor;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCollectionDirPath(): Promise<any>;
    newDataSourceData(params: any): any;
}
export = FormEditor;
