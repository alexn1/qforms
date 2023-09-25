import { Model } from '../Model';
import { Table } from '../Table/Table';
import { Helper } from '../../../common/Helper';
import { DatabaseResult } from '../../../../Result';
import { DatabaseData } from '../../../../common/ModelData/DatabaseData';

export class Database extends Model<DatabaseData> {
    tables: Table[] = [];

    init() {
        // console.debug('Database.init', this.getName());
        for (const tableData of this.getData().tables) {
            const table = new Table(tableData, this);
            table.init();
            this.addTable(table);
        }
    }

    addTable(table: Table) {
        this.tables.push(table);
    }

    findTable(name: string): Table | undefined {
        return this.tables.find((table) => table.getName() === name);
    }

    getTable(name: string): Table {
        const table = this.findTable(name);
        if (!table) throw new Error(`${this.getFullName()}: no table with name: ${name}`);
        return table;
    }

    emitResult(result: DatabaseResult, source = null) {
        console.debug('Database.emitResult');
        const promises: any[] = [];
        for (const table in result) {
            promises.push(...this.getTable(table).emitResult(result[table], source));
        }
        return promises;
    }
}

Helper.registerGlobalClass(Database);
