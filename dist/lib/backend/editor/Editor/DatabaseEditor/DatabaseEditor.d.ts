declare const Editor: any;
declare class DatabaseEditor extends Editor {
    static createData(params: any): void;
    newParamData(params: any): any;
}
export = DatabaseEditor;
