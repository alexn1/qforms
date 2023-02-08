import { EventEmitter } from '../EventEmitter';
export declare class Model extends EventEmitter {
    data: any;
    parent: any;
    deinited: boolean;
    dataSources: any[];
    constructor(data: any, parent?: any);
    init(): void;
    deinit(): void;
    static getAttr(data: any, name: any): any;
    static getCol(data: any, name: any): any;
    static getName(data: any): any;
    static getClassName(data: any): any;
    isAttr(name: any): any;
    getAttr(name: any): any;
    getCol(name: any): any;
    getClassName(): any;
    getName(): any;
    getFullName(): any;
    getCaption(): string;
    getDataSource(name: any): any;
    createDataSources(): void;
    deinitDataSources(): void;
    hasActions(): boolean;
    getParent(): Model;
    getData(): any;
}
