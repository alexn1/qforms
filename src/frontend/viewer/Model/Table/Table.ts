import { Model } from '../Model';
import { Column } from '../Column/Column';
import { Helper } from '../../../common/Helper';
import { TableResult, InsertResult, UpdateResult, DeleteResult } from '../../../../Result';

export class Table extends Model {
    columns: Column[] = [];

    /* constructor(data, parent) {
        super(data, parent);
        this.columns = [];
    } */

    init() {
        // console.debug('Table.init', this.getFullName());
        for (const data of this.getData().columns) {
            const column = new Column(data, this);
            column.init();
            this.addColumn(column);
        }
    }

    addColumn(column: Column) {
        this.columns.push(column);
    }

    getColumn(name: string) {
        const column = this.columns.find((column) => column.getName() === name);
        if (!column) throw new Error(`table ${this.getFullName()}: no column ${name}`);
        return column;
    }

    emitResult(result: TableResult, source: any = null): Array<Promise<void>> {
        console.debug('Table.emitResult');
        return [
            ...(result.insert ? [this.emitInsert(source, result.insert)] : []),
            ...(result.update ? [this.emitUpdate(source, result.update)] : []),
            ...(result.delete ? [this.emitDelete(source, result.delete)] : []),
            ...(result.refresh ? [this.emitRefresh(source)] : []),
        ];
    }

    emitInsert(source, inserts: InsertResult) {
        return this.emit('insert', { source, inserts });
    }

    emitUpdate(source, updates: UpdateResult) {
        return this.emit('update', { source, updates });
    }

    emitDelete(source, deletes: DeleteResult) {
        return this.emit('delete', { source, deletes });
    }

    emitRefresh(source) {
        return this.emit('refresh', { source });
    }
}

Helper.registerGlobalClass(Table);
