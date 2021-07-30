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
            this.tables.push(table);
        }
    }

    getTable(name) {
        const table = this.tables.find(table => table.getName() === name);
        if (!table) throw new Error(`${this.getFullName()}: no table with name: ${name}`);
        return table;
    }

    emitResult(result, source) {
        this.emitDelete(result, source);
        this.emitUpdate(result, source);
        this.emitInsert(result, source);
    }

    emitInsert(result, source = null) {
        if (!result.insert) return;
        for (const tableName in result.insert) {
            const table = this.getTable(tableName);
            for (const key in result.insert[tableName]) {
                table.emit('insert', {source: source, key: key});
            }
        }
    }

    emitUpdate(result, source = null) {
        if (!result.update) return;
        for (const tableName in result.update) {
            const table = this.getTable(tableName);
            for (const key in result.update[tableName]) {
                const newKey = result.update[tableName][key];
                table.emit('update', {source: source, changes: {[key]: newKey}});
            }
        }
    }
    emitDelete(result, source = null) {
        if (!result.delete) return;
        for (const tableName in result.delete) {
            const table = this.getTable(tableName);
            for (const key of result.delete[tableName]) {
                table.emit('delete', {source: source, key: key});
            }
        }
    }
}
window.QForms.Database = Database;
