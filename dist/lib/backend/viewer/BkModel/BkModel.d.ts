import { Context } from '../../Context';
import { BaseModel } from '../../BaseModel';
export declare class BkModel extends BaseModel {
    fillCollections: any[];
    init(context: Context): Promise<void>;
    fill(context: Context): Promise<any>;
    fillAttributes(response: any): void;
    isBackOnly(): boolean;
    fillCollection(response: any, colName: string, context: Context): Promise<void>;
    createColItems(colName: string, context: Context): Promise<void>;
    createColItem(colName: string, itemData: any, context: Context): Promise<void>;
    createChildModel(colName: string, itemData: any): Promise<any>;
    getDirPath(): string | null;
    rpc(name: string, context: Context): Promise<any>;
}
