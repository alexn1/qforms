import { BkPersistentDataSource } from '../BkPersistentDataSource';
import { ReadResult } from '../../BkDataSource';
import { BkTable } from '../../../BkTable/BkTable';
import { Context } from '../../../../../Context';
import { Result } from '../../../../../../Result';
import { SqlDatabase } from '../../../BkDatabase/BkSqlDatabase/BkSqlDatabase';
export declare class BkSqlDataSource extends BkPersistentDataSource<SqlDatabase> {
    table: BkTable | null;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    getKeyColumns(): string[];
    getCountQuery(context: Context): string;
    getSingleQuery(context: Context): string;
    getMultipleQuery(context: Context): string;
    templateQuery(context: Context, _query: string): string;
    getSelectParams(context: Context): {
        [name: string]: any;
    };
    read(context: Context): Promise<ReadResult>;
    create(context: Context, _values?: any): Promise<Result>;
    update(context: Context): Promise<Result>;
    delete(context: Context): Promise<Result>;
    fillAttributes(response: any): void;
    getAutoColumns(): string[];
    getAutoColumnTypes(): {};
    getBuffer(context: Context, file: any): Promise<any>;
}
