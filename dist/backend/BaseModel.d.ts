import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
import { BkModelData } from './viewer/BkModelData/BkModelData';
export declare class BaseModel<TBkModelData extends BkModelData = BkModelData> {
    protected data: TBkModelData;
    private parent?;
    constructor(data: TBkModelData, parent?: BaseModel<BkModelData> | undefined);
    static getClassName(data: BkModelData): string;
    static getAttr(data: BkModelData, name: string): string;
    static getName(data: BkModelData): string;
    getClassName(): string;
    getName(): string;
    static attributes(data: BkModelData): import("./viewer/BkModelData/BkModelData").BkModelAttributes;
    attributes(): import("./viewer/BkModelData/BkModelData").BkModelAttributes;
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
    addModelData(colName: string, data: BkModelData): void;
    getApp(): BkApplication;
    replaceDataColItem(colName: string, oldData: BkModelData, newData: BkModelData): any;
    getParent<T extends BaseModel = BaseModel>(): T;
}
