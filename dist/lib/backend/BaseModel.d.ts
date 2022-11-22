declare class BaseModel {
    data: any;
    parent: any;
    constructor(data: any, parent?: any);
    static getClassName(data: any): string;
    static getAttr(data: any, name: any): any;
    static getName(data: any): string;
    static getEnvList(data: any): string[];
    getClassName(): string;
    getName(): string;
    static attributes(data: any): any;
    attributes(): any;
    getAttr(name: any): any;
    setAttr(name: any, value: any): void;
    isAttr(name: any): boolean;
    isData(colName: any, name: any): boolean;
    getData(): any;
    getCol(name: any): any;
    getItemNames(colName: any): any;
    getColItemData(colName: any, name: any): any;
    removeColData(colName: any, name: any): any;
    static findColDataByName(col: any, name: any): any;
    addModelData(colName: any, data: any): void;
    getApp(): void;
    replaceDataColItem(colName: any, oldData: any, newData: any): any;
    getParent(): any;
}
export = BaseModel;
