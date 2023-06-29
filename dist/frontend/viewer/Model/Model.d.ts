import { EventEmitter } from '../EventEmitter';
import { DataSource } from './DataSource/DataSource';
import { ModelData } from '../../../data';
export declare class Model<T extends ModelData = any> extends EventEmitter {
    data: T;
    private parent;
    deinited: boolean;
    dataSources: DataSource[];
    constructor(data: T, parent?: Model | null);
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
    getDataSource(name: string): DataSource | undefined;
    createDataSources(): void;
    deinitDataSources(): void;
    hasActions(): boolean;
    getParent(): Model;
    getData(): T;
}
