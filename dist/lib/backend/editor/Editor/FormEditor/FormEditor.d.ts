declare const Editor: any;
declare class FormEditor extends Editor {
    static createAttributes(params: any): any;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCollectionDirPath(): Promise<any>;
    getColName(): string;
}
export = FormEditor;
