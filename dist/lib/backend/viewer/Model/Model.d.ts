import Context from "../../Context";
import BaseModel from '../../BaseModel';
declare class Model extends BaseModel {
    fillCollections: any[];
    constructor(data: any, parent?: any);
    init(context: Context): Promise<void>;
    fill(context: Context): Promise<any>;
    fillAttributes(response: any): void;
    isBackOnly(): boolean;
    fillCollection(response: any, colName: string, context: Context): Promise<void>;
    createColItems(colName: string, context: Context): Promise<void>;
    createColItem(colName: string, data: any, context: Context): Promise<void>;
    getChildModelCustomClass(model: Model, colName: string, data: any): Promise<any>;
    createChildModel(colName: string, data: any): Promise<any>;
    getDirPath(): string;
    rpc(name: string, context: Context): Promise<void>;
}
export = Model;
