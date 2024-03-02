import { EventEmitter } from '../EventEmitter';
import { DataSource } from './DataSource/DataSource';
import { ModelData } from '../../../common/ModelData/ModelData';
export declare class Model<TModelData extends ModelData = ModelData> extends EventEmitter {
    private data;
    private parent?;
    deinited: boolean;
    dataSources: DataSource[];
    constructor(data: TModelData, parent?: Model<ModelData> | undefined);
    init(): void;
    deinit(): void;
    static getAttr(data: ModelData, name: string): any;
    static getCol(data: ModelData, name: string): any;
    static getName(data: ModelData): string;
    static getClassName(data: ModelData): string;
    isAttr(name: string): boolean;
    getAttr(name: string): any;
    getCol(name: string): any;
    getClassName(): string;
    getName(): string;
    getFullName(): string;
    getCaption(): string;
    findDataSource(name: string): DataSource | undefined;
    getDataSource(name: string): DataSource;
    createDataSources(): void;
    deinitDataSources(): void;
    hasActions(): boolean;
    getParent<TModel extends Model = Model>(): TModel;
    getData(): TModelData;
}
