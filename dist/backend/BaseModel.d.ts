import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
import { BkModelScheme } from './viewer/BkModelScheme/BkModelScheme';
export declare class BaseModel<TBkModelData extends BkModelScheme = BkModelScheme> {
    protected data: TBkModelData;
    private parent?;
    constructor(data: TBkModelData, parent?: BaseModel<BkModelScheme> | undefined);
    static getClassName(data: BkModelScheme): string;
    static getAttr(data: BkModelScheme, name: string): string;
    static getName(data: BkModelScheme): string;
    getClassName(): string;
    getName(): string;
    static attributes(data: BkModelScheme): import("./viewer/BkModelScheme/BkModelScheme").BkModelAttributesScheme;
    attributes(): import("./viewer/BkModelScheme/BkModelScheme").BkModelAttributesScheme;
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
    addModelData(colName: string, data: BkModelScheme): void;
    getApp(): BkApplication;
    replaceDataColItem(colName: string, oldData: BkModelScheme, newData: BkModelScheme): any;
    getParent<T extends BaseModel = BaseModel>(): T;
}
