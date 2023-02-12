import { BkPersistentDataSource } from '../PersistentDataSource';
import { Context } from '../../../../../Context';
import { BkTable } from '../../../Table/Table';
import { Result } from '../../../../../Result';
import { BkNoSqlDatabase } from '../../../Database/NoSqlDatabase/NoSqlDatabase';
import { ReadResult } from '../../DataSource';
export declare class BkNoSqlDataSource extends BkPersistentDataSource<BkNoSqlDatabase> {
    table: BkTable | null;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    read(context: Context): Promise<ReadResult>;
    update(context: Context): Promise<Result>;
    getSelectQuery(): string;
    getCountQuery(context: Context): string;
    getSelectParams(context: Context): any;
}
