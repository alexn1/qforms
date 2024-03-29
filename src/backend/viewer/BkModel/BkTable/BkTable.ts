import { BkModel } from '../BkModel';
import { BkColumn } from '../BkColumn/BkColumn';
import { BkApplication } from '../BkApplication/BkApplication';
import { Context } from '../../../Context';
import { TableScheme } from '../../../common/Scheme/TableScheme';
import { BkDatabase } from '../BkDatabase/BkDatabase';
import { TableData } from '../../../../common/ModelData/TableData';

export class BkTable extends BkModel<TableScheme> {
    columns: BkColumn[] = [];

    constructor(data: TableScheme, parent: BkDatabase) {
        super(data, parent);
        // debug('Table.constructor', this.getName());
        this.fillCollections = ['columns'];
    }

    async init(context: Context) {
        await this.createColItems('columns', context);
    }

    getKeyColumns(): string[] {
        // debug('Table.getKeyColumns');
        const keyColumns = this.columns
            .filter((column) => column.isKey())
            .map((column) => column.getName());
        // const keyColumns = Object.keys(this.columns).filter(name => this.columns[name].isKey());
        if (keyColumns.length === 0) throw new Error(`no key columns in table: ${this.getName()}`);
        return keyColumns;
    }

    getApp(): BkApplication {
        return this.getParent().getParent();
    }

    getColumn(name: string): BkColumn {
        const column = this.columns.find((column) => column.getName() === name);
        if (!column) throw new Error(`no column ${name}`);
        return column;
    }

    fillAttributes(response: TableData): void {
        response.name = this.getAttr('name');
    }
}
