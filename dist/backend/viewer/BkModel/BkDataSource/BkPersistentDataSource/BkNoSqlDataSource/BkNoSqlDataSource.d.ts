import { BkPersistentDataSource } from '../BkPersistentDataSource';
import { Context } from '../../../../../Context';
import { BkTable } from '../../../BkTable/BkTable';
import { Result } from '../../../../../../Result';
import { BkNoSqlDatabase } from '../../../BkDatabase/BkNoSqlDatabase/BkNoSqlDatabase';
import { ReadResult } from '../../BkDataSource';
import { Row, RawRow } from '../../../../../../types';
export declare class BkNoSqlDataSource extends BkPersistentDataSource<BkNoSqlDatabase> {
    table: BkTable | null;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    read(context: Context): Promise<ReadResult>;
    create(context: Context, _values?: any): Promise<Result>;
    update(context: Context): Promise<Result>;
    delete(context: Context): Promise<Result>;
    getSelectQuery(context: Context): string;
    getCountQuery(context: Context): string;
    getSelectParams(context: Context): import("../../../../../../types").Params;
    checkRow(row: Row): void;
    encodeRow2(row: Row): RawRow;
}