import { Model } from '../Model';
import { Column } from '../Column/Column';
import { Result } from '../../../../Result';
export declare class Table extends Model {
    columns: Column[];
    init(): void;
    addColumn(column: Column): void;
    getColumn(name: string): Column;
    emitResult(result: Result, source?: null): Array<Promise<void>>;
    emitInsert(source: any, inserts: any): Promise<void>;
    emitUpdate(source: any, updates: any): Promise<void>;
    emitDelete(source: any, deletes: any): Promise<void>;
    emitRefresh(source: any): Promise<void>;
}
