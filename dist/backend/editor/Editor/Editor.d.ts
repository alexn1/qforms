import { BaseModel, BkModelData } from '../../BaseModel';
export declare class Editor extends BaseModel {
    createFileByParams(newFilePath: any, templateFilePath: any, params: any): Promise<any>;
    getFile(filePath: any): Promise<string | undefined>;
    saveFile(filePath: any, content: any): Promise<void>;
    getCustomFile(ext: any): Promise<string | undefined>;
    saveCustomFile(ext: any, text: any): Promise<void>;
    getCustomFilePath(ext: any): Promise<string>;
    moveDataColItem(colName: any, name: any, offset: any): void;
    setColData(colName: string, newData: BkModelData): any;
    createItemEditor(colName: string, itemName: string): any;
    getCustomDirPath(): Promise<string>;
    getCollectionDirPath(): Promise<string>;
    moveItemUp(colName: any, itemName: any): void;
    moveItemDown(colName: any, itemName: any): void;
    newItemData(className: any, colName: any, params: any): any;
    getColName(): void;
    static createItemData(data: any): any;
}
