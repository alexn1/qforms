declare const BaseModel: any;
declare class Editor extends BaseModel {
    createFileByParams(newFilePath: any, templateFilePath: any, params: any): Promise<any>;
    getFile(filePath: any): Promise<any>;
    saveFile(filePath: any, content: any): Promise<any>;
    getCustomFile(ext: any): Promise<any>;
    saveCustomFile(ext: any, text: any): Promise<any>;
    moveDataSourceUp(name: any): void;
    moveDataSourceDown(name: any): void;
    moveActionUp(name: any): void;
    moveActionDown(name: any): void;
    getCustomDirPath(): Promise<string>;
    getCustomFilePath(ext: any): Promise<any>;
    moveDataColItem(colName: any, name: any, offset: any): void;
    newActionData(params: any): Promise<any>;
    createActionEditor(name: any): any;
    setData(colName: any, newData: any): any;
    createItemEditor(colName: any, itemName: any): any;
}
export = Editor;
