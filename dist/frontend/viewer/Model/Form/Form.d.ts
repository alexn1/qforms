import { Model } from '../Model';
import { DataSource } from '../../Model/DataSource/DataSource';
import { Field } from '../../Model/Field/Field';
import { Key, RawRow, Row } from '../../../../types';
import { Page } from '../Page/Page';
import { Application } from '../Application/Application';
import { FormData } from '../../../../common/ModelData/FormData';
export declare class Form extends Model<FormData> {
    dataSources: DataSource[];
    fields: Field[];
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
    rpc(name: string, params: Record<string, any>): Promise<any>;
    getKey(): Key | null;
    getDefaultDataSource<TDataSource extends DataSource = DataSource>(): TDataSource;
    getPage(): Page;
    getApp(): Application;
    refresh(): Promise<void>;
    findField(name: string): Field | undefined;
    getField(name: string): Field;
    hasDefaultPersistentDataSource(): boolean;
    decodeRow(rawRow: RawRow): Row;
}
