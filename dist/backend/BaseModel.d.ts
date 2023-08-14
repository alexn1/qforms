import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
import { ModelScheme } from './common/Scheme/ModelScheme';
export declare class BaseModel<TBkModelData extends ModelScheme = ModelScheme> {
    protected data: TBkModelData;
    private parent?;
    constructor(data: TBkModelData, parent?: BaseModel<ModelScheme> | undefined);
    static getClassName(data: ModelScheme): string;
    static getAttr(data: ModelScheme, name: string): string;
    static getName(data: ModelScheme): string;
    getClassName(): string;
    getName(): string;
    static attributes(data: ModelScheme): import("./common/Scheme/ModelScheme").ModelAttributes;
    attributes(): import("./common/Scheme/ModelScheme").ModelAttributes;
    getAttr(name: string): string;
    setAttr(name: string, value: string): void;
    isAttr(name: string): boolean;
    isData(colName: string, name: string): boolean;
    getData(): TBkModelData;
    getCol(name: string): any;
    getItemNames(colName: string): any;
    getColItemData(colName: string, name: string): any;
    removeColData(colName: string, name: string): any;
    static findColDataByName(col: any[], name: string): any;
    addModelData(colName: string, data: ModelScheme): void;
    getApp(): BkApplication;
    replaceDataColItem(colName: string, oldData: ModelScheme, newData: ModelScheme): any;
    getParent<T extends BaseModel = BaseModel>(): T;
}
