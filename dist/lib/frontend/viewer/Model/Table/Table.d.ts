import { Model } from '../Model';
export declare class Table extends Model {
    columns: any[];
    constructor(data: any, parent: any);
    init(): void;
    addColumn(column: any): void;
    getColumn(name: any): any;
    emitResult(result: any, source?: any): Promise<void>[];
    emitInsert(source: any, inserts: any): Promise<void>;
    emitUpdate(source: any, updates: any): Promise<void>;
    emitDelete(source: any, deletes: any): Promise<void>;
    emitRefresh(source: any): Promise<void>;
}
