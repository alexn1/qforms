class Database extends Model {
    constructor(...args) {
        super(...args);
        this.tables = [];
    }

    init() {
        // console.log('Database.init', this.getName());
        for (const data of this.data.tables) {
            const table = new Table(data, this);
            table.init();
            this.addTable(table);
        }
    }

    addTable(table) {
        this.tables.push(table);
    }

    getTable(name) {
        const table = this.tables.find(table => table.getName() === name);
        if (!table) throw new Error(`${this.getFullName()}: no table with name: ${name}`);
        return table;
    }

    emitResult(result, source) {
        console.log('Database.emitResult', result, source);
        this.emitDelete(result, source);
        this.emitUpdate(result, source);
        this.emitInsert(result, source);
    }

    emitInsert(result, source = null) {
        if (!result.insert) return;
        for (const table in result.insert) {
            this.getTable(table).emitInsert(source, result.insert[table]);
        }
    }

    emitUpdate(result, source = null) {
        if (!result.update) return;
        for (const table in result.update) {
            this.getTable(table).emitUpdate(source, result.update[table]);
        }
    }
    emitDelete(result, source = null) {
        if (!result.delete) return;
        for (const table in result.delete) {
            this.getTable(table).emitDelete(source, result.delete[table]);
        }
    }
}
window.QForms.Database = Database;
