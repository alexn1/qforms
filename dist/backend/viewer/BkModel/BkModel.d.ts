import { Context } from '../../Context';
import { BaseModel } from '../../BaseModel';
import { ModelScheme } from '../../common/Scheme/ModelScheme';
import { ModelData } from '../../../common/ModelData/ModelData';
export declare class BkModel<TModelScheme extends ModelScheme = ModelScheme> extends BaseModel<TModelScheme> {
    deinited: boolean;
    fillCollections: string[];
    init(context: Context): Promise<void>;
    deinit(): Promise<void>;
    checkDeinited(): void;
    fill(context: Context): Promise<any>;
    fillAttributes(response: ModelData): void;
    isBackOnly(): boolean;
    fillCollection(response: ModelData, colName: string, context: Context): Promise<void>;
    createColItems(colName: string, context: Context): Promise<void>;
    createColItem(colName: string, itemData: any, context: Context): Promise<void>;
    createChildModel(colName: string, itemData: any): Promise<any>;
    getDirPath(): string | null;
    rpc(name: string, context: Context): Promise<any>;
}
