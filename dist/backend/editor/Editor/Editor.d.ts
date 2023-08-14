import { BaseModel } from '../../BaseModel';
import { ModelScheme } from '../../common/Scheme/ModelScheme';
export declare class Editor<TBkModelData extends ModelScheme = ModelScheme> extends BaseModel<TBkModelData> {
    private editorPath;
    constructor(data: TBkModelData, parent: Editor | undefined, editorPath: string);
    getEditorPath(): string;
    createFileByParams(newFilePath: string, templateFilePath: string, params: any): Promise<any>;
    getFile(filePath: string): Promise<string | undefined>;
    saveFile(filePath: string, content: string): Promise<void>;
    getCustomFile(ext: string): Promise<string | undefined>;
    saveCustomFile(ext: string, text: string): Promise<void>;
    getCustomFilePath(ext: any): Promise<string>;
    moveDataColItem(colName: any, name: any, offset: any): void;
    setColData(colName: string, newData: ModelScheme): any;
    createItemEditor(colName: string, itemName: string): any;
    getCustomDirPath(): Promise<string>;
    getCollectionDirPath(): Promise<string>;
    moveItemUp(colName: any, itemName: any): void;
    moveItemDown(colName: any, itemName: any): void;
    newItemData(className: any, colName: any, params: any): any;
    getColName(): void;
    static createItemData(data: any): any;
}
