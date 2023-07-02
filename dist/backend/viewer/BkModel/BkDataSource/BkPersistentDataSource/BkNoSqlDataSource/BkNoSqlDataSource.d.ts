import { BkPersistentDataSource } from '../BkPersistentDataSource';
import { Context } from '../../../../../Context';
import { BkTable } from '../../../BkTable/BkTable';
import { Result } from '../../../../../../Result';
import { BkNoSqlDatabase } from '../../../BkDatabase/BkNoSqlDatabase/BkNoSqlDatabase';
import { ReadResult } from '../../BkDataSource';
import { Row, RawRow } from '../../../../../../types';
import { BkModelData } from '../../../../BkModelData/BkModelData';
import { BkModel } from '../../../BkModel';
export declare class BkNoSqlDataSource extends BkPersistentDataSource<BkNoSqlDatabase> {
    table: BkTable | null;
    constructor(data: BkModelData, parent: BkModel);
    fill(context: Context): Promise<any>;
    read(context: Context): Promise<ReadResult>;
    create(context: Context, _values?: any): Promise<Result>;
    update(context: Context): Promise<Result>;
    delete(context: Context): Promise<Result>;
    getSelectQuery(context: Context): string;
    getCountQuery(context: Context): string;
    getSelectParams(context: Context): Record<string, any>;
    checkRow(row: Row): void;
    encodeRow(row: Row): RawRow;
}
