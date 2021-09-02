declare const BaseModel: any;
declare class Editor extends BaseModel {
    createFileByParams(newFilePath: any, templateFilePath: any, params: any): Promise<any>;
    getFile(filePath: any): Promise<any>;
    saveFile(filePath: any, content: any): Promise<any>;
    getCustomFile(ext: any): Promise<any>;
    saveCustomFile(ext: any, text: any): Promise<any>;
    getCustomFilePath(ext: any): Promise<any>;
    moveDataColItem(colName: any, name: any, offset: any): void;
    newActionData(params: any): Promise<any>;
    setData(colName: any, newData: any): any;
    createItemEditor(colName: string, itemName: string): any;
    getCustomDirPath(): Promise<any>;
    getCollectionDirPath(): Promise<string>;
    moveItemUp(colName: any, itemName: any): void;
    moveItemDown(colName: any, itemName: any): void;
    newItemData(className: any, colName: any, params: any): any;
    getColName(): void;
    reformat(): Promise<any>;
}
export = Editor;
