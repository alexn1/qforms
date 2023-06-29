import { Model } from '../Model';
import { Table } from '../Table/Table';
export declare class Database extends Model {
    tables: Table[];
    init(): void;
    addTable(table: Table): void;
    getTable(name: string): Table;
    emitResult(result: any, source?: null): any[];
}
