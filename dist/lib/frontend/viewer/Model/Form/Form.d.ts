import { Model } from '../Model';
import { DataSource } from '../../Model/DataSource/DataSource';
import { Field } from '../../Model/Field/Field';
import { RawRow, Row } from '../../../../types';
export declare class Form extends Model {
    dataSources: DataSource[];
    fields: Field[];
    constructor(data: any, parent: any);
    init(): void;
    deinit(): void;
    fillDefaultValues(row: RawRow): void;
    onDataSourceRefresh(e: any): void;
    onDataSourceInsert(e: any): void;
    onDataSourceUpdate(e: any): void;
    onDataSourceDelete(e: any): void;
    update(): Promise<void>;
    isChanged(): boolean;
    hasNew(): boolean;
    rpc(name: string, params: {
        [name: string]: any;
    }): Promise<any>;
    getKey(): any;
    getDefaultDataSource<TDataSource extends DataSource = DataSource>(): TDataSource;
    getPage(): any;
    getApp(): any;
    refresh(): Promise<void>;
    getField(name: any): Field;
    hasDefaultPersistentDataSource(): boolean;
    decodeRow(row: RawRow): Row;
}
