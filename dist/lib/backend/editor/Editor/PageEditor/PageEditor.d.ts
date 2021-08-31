declare const Editor: any;
declare class PageEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            formatVersion: string;
            name: any;
            caption: any;
        };
        dataSources: any[];
        actions: any[];
        forms: any[];
    };
    constructor(appEditor: any, pageFile: any);
    setAttr(name: any, value: any): Promise<void>;
    moveFormUp(params: any): Promise<string>;
    save(): Promise<void>;
    moveFormDown(params: any): Promise<string>;
    newFormData(params: any): any;
    createFormEditor(name: any): any;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCustomDirPath(): Promise<any>;
    newDataSourceData(params: any): any;
}
export = PageEditor;
