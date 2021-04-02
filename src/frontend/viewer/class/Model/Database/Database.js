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

    emitUpdate(result, source = null) {
        if (!result.update) return;
        for (const tableName in result.update) {
            const table = this.getTable(tableName);
            for (const key in result.update[tableName]) {
                const oldKey = result.update[tableName][key];
                table.emit('update', {source: source, changes: {[key]: oldKey}});
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
