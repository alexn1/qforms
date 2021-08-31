declare const Editor: any;
declare class DatabaseEditor extends Editor {
    static createData(params: any): void;
    newTableData(params: any): any;
    createTableEditor(name: any): any;
    newParamData(params: any): any;
    createParamEditor(name: any): any;
    moveTableUp(name: any): string;
    moveTableDown(name: any): string;
}
export = DatabaseEditor;
