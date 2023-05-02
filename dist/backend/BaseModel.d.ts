export declare class BaseModel {
    data: any;
    parent?: any;
    constructor(data: any, parent?: any);
    static getClassName(data: any): string;
    static getAttr(data: any, name: string): string;
    static getName(data: any): string;
    static getEnvList(data: any): string[];
    getClassName(): string;
    getName(): string;
    static attributes(data: any): any;
    attributes(): any;
    getAttr(name: any): string;
    setAttr(name: string, value: string): void;
    isAttr(name: string): boolean;
    isData(colName: string, name: string): boolean;
    getData(): any;
    getCol(name: string): any;
    getItemNames(colName: string): any;
    getColItemData(colName: string, name: string): any;
    removeColData(colName: string, name: string): any;
    static findColDataByName(col: any, name: string): any;
    addModelData(colName: string, data: any): void;
    getApp(): void;
    replaceDataColItem(colName: string, oldData: any, newData: any): any;
    getParent(): any;
}
