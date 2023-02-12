import { BkModel } from '../Model';
import { BkColumn } from '../Column/Column';
import { BkApplication } from '../Application/Application';
import { Context } from '../../../Context';
export declare class BkTable extends BkModel {
    columns: BkColumn[];
    constructor(data: any, parent: any);
    init(context: Context): Promise<void>;
    getKeyColumns(): string[];
    getApp(): BkApplication;
    getColumn(name: string): BkColumn;
    fillAttributes(response: any): void;
}
