declare const Editor: any;
declare class DatabaseEditor extends Editor {
    static createData(params: any): void;
    newTableData(params: any): any;
    newParamData(params: any): any;
}
export = DatabaseEditor;
