import { Model } from '../Model';
import { Column } from '../Column/Column';
import { TableResult, InsertResult, UpdateResult, DeleteResult } from '../../../../Result';
import { TableData } from '../../../../common/TableData';
export declare class Table extends Model<TableData> {
    columns: Column[];
    init(): void;
    addColumn(column: Column): void;
    getColumn(name: string): Column;
    emitResult(result: TableResult, source?: any): Array<Promise<void>>;
    emitInsert(source: any, inserts: InsertResult): Promise<void>;
    emitUpdate(source: any, updates: UpdateResult): Promise<void>;
    emitDelete(source: any, deletes: DeleteResult): Promise<void>;
    emitRefresh(source: any): Promise<void>;
}
