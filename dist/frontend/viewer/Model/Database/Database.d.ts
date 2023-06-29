import { Model } from '../Model';
export declare class Database extends Model {
    tables: any[];
    init(): void;
    addTable(table: any): void;
    getTable(name: any): any;
    emitResult(result: any, source?: any): any[];
}
