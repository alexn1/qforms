import { Model } from '../Model';
import { DataSource } from '../../Model/DataSource/DataSource';
export declare class Form extends Model {
    dataSources: any[];
    fields: any[];
    constructor(data: any, parent: any);
    init(): void;
    deinit(): void;
    fillDefaultValues(row: any): void;
    onDataSourceRefresh(e: any): void;
    onDataSourceInsert(e: any): void;
    onDataSourceUpdate(e: any): void;
    onDataSourceDelete(e: any): void;
    update(): Promise<void>;
    isChanged(): boolean;
    hasNew(): boolean;
    rpc(name: any, params: any): Promise<any>;
    getKey(): any;
    getDefaultDataSource(): DataSource;
    getPage(): any;
    getApp(): any;
    refresh(): Promise<void>;
    getField(name: any): any;
    hasDefaultPersistentDataSource(): boolean;
    decodeRow(row: any): {};
}
