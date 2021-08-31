declare const Editor: any;
declare class FieldEditor extends Editor {
    changeClass(newClassName: any): Promise<any>;
    reformat(): Promise<any>;
    createJs(params: any): Promise<any>;
    getCollectionDirPath(): Promise<any>;
    getCustomDirPath(): Promise<any>;
    static createAttributes(params: any): {
        name: any;
        caption: any;
        column: any;
        defaultValue: any;
        value: any;
        param: any;
        isVisible: any;
        type: any;
        width: any;
    };
}
export = FieldEditor;
