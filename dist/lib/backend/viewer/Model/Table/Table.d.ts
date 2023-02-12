import { Model } from '../Model';
import { BkColumn } from '../Column/Column';
import { Application } from '../Application/Application';
export declare class Table extends Model {
    columns: BkColumn[];
    constructor(data: any, parent: any);
    init(context: any): Promise<void>;
    getKeyColumns(): string[];
    getApp(): Application;
    getColumn(name: any): BkColumn;
    fillAttributes(response: any): void;
}
