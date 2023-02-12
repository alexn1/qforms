import { Model } from '../Model';
import { BkColumn } from '../Column/Column';
import { Application } from '../Application/Application';
import { Context } from '../../../Context';
export declare class BkTable extends Model {
    columns: BkColumn[];
    constructor(data: any, parent: any);
    init(context: Context): Promise<void>;
    getKeyColumns(): string[];
    getApp(): Application;
    getColumn(name: string): BkColumn;
    fillAttributes(response: any): void;
}
