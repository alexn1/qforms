import { BkModel } from '../BkModel';
import { BkColumn } from '../BkColumn/BkColumn';
import { BkApplication } from '../BkApplication/BkApplication';
import { Context } from '../../../Context';
import { TableScheme } from '../../../common/Scheme/TableScheme';
import { BkDatabase } from '../BkDatabase/BkDatabase';
export declare class BkTable extends BkModel<TableScheme> {
    columns: BkColumn[];
    constructor(data: TableScheme, parent: BkDatabase);
    init(context: Context): Promise<void>;
    getKeyColumns(): string[];
    getApp(): BkApplication;
    getColumn(name: string): BkColumn;
    fillAttributes(response: any): void;
}
