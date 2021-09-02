declare const Editor: any;
declare class FieldEditor extends Editor {
    static createAttributes(params: any): any;
    changeClass(newClassName: any): any;
    createJs(params: any): Promise<any>;
    getCollectionDirPath(): Promise<any>;
    getColName(): string;
}
export = FieldEditor;
