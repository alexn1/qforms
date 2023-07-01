import { Model } from '../Model';
import { Table } from '../Table/Table';
import { DatabaseResult } from '../../../../Result';
export declare class Database extends Model {
    tables: Table[];
    init(): void;
    addTable(table: Table): void;
    findTable(name: string): Table | undefined;
    getTable(name: string): Table;
    emitResult(result: DatabaseResult, source?: null): any[];
}
