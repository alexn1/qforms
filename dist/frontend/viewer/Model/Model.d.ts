import { EventEmitter } from '../EventEmitter';
import { DataSource } from './DataSource/DataSource';
import { ModelData } from '../../../data';
export declare class Model<T extends ModelData = any> extends EventEmitter {
    data: T;
    parent: any;
    deinited: boolean;
    dataSources: DataSource[];
    constructor(data: T, parent: any);
    init(): void;
    deinit(): void;
    static getAttr(data: ModelData, name: string): any;
    static getCol(data: ModelData, name: string): any;
    static getName(data: ModelData): any;
    static getClassName(data: ModelData): any;
    isAttr(name: string): boolean;
    getAttr(name: string): any;
    getCol(name: string): any;
    getClassName(): string;
    getName(): string;
    getFullName(): string;
    getCaption(): string;
    getDataSource(name: string): DataSource;
    createDataSources(): void;
    deinitDataSources(): void;
    hasActions(): boolean;
    getParent(): Model;
    getData(): T;
}
