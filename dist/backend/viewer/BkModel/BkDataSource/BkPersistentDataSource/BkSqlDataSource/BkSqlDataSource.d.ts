import { BkPersistentDataSource } from '../BkPersistentDataSource';
import { ReadResult } from '../../BkDataSource';
import { Context } from '../../../../../Context';
import { Result } from '../../../../../../Result';
import { BkSqlDatabase } from '../../../BkDatabase/BkSqlDatabase/BkSqlDatabase';
export declare class BkSqlDataSource extends BkPersistentDataSource<BkSqlDatabase> {
    fill(context: Context): Promise<import("../../../../../..").DataSourceData>;
    getKeyColumns(): string[];
    getCountQuery(context: Context): string;
    getSingleQuery(context: Context): string;
    getMultipleQuery(context: Context): string;
    templateQuery(context: Context, _query: string): string;
    getSelectParams(context: Context): Record<string, any>;
    read(context: Context): Promise<ReadResult>;
    create(context: Context, _values?: any): Promise<Result>;
    update(context: Context): Promise<Result>;
    delete(context: Context): Promise<Result>;
    fillAttributes(response: any): void;
    getAutoColumns(): string[];
    getAutoColumnTypes(): Record<string, string>;
}
