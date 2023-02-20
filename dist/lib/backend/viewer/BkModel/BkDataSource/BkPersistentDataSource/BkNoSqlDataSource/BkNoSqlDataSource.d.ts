import { BkPersistentDataSource } from '../BkPersistentDataSource';
import { Context } from '../../../../../Context';
import { BkTable } from '../../../BkTable/BkTable';
import { Result } from '../../../../../../Result';
import { BkNoSqlDatabase } from '../../../BkDatabase/BkNoSqlDatabase/BkNoSqlDatabase';
import { ReadResult } from '../../BkDataSource';
export declare class BkNoSqlDataSource extends BkPersistentDataSource<BkNoSqlDatabase> {
    table: BkTable | null;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    read(context: Context): Promise<ReadResult>;
    create(context: Context, _values?: any): Promise<Result>;
    update(context: Context): Promise<Result>;
    delete(context: Context): Promise<Result>;
    getSelectQuery(): string;
    getCountQuery(context: Context): string;
    getSelectParams(context: Context): {
        [name: string]: any;
    };
}