import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
export interface BkModelData {
    [name: string]: any;
    '@class': string;
    '@attributes': {
        [name: string]: any;
        name: string;
    };
    env?: {
        [name: string]: any;
    };
}
export declare class BaseModel<TBkModelData extends BkModelData = BkModelData> {
    data: TBkModelData;
    private parent?;
    constructor(data: TBkModelData, parent?: BaseModel<BkModelData> | undefined);
    static getClassName(data: BkModelData): string;
    static getAttr(data: BkModelData, name: string): string;
    static getName(data: BkModelData): string;
    static getEnvList(data: BkModelData): string[];
    getClassName(): string;
    getName(): string;
    static attributes(data: BkModelData): {
        [name: string]: any;
        name: string;
    };
    attributes(): {
        [name: string]: any;
        name: string;
    };
    getAttr(name: string): string;
    setAttr(name: string, value: string): void;
    isAttr(name: string): boolean;
    isData(colName: string, name: string): boolean;
    getData(): BkModelData;
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
