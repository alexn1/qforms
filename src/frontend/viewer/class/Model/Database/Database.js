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
        if (!table) throw new Error(`no table with name: ${name}`);
        return table;
    }

    emitUpdate(result) {
        for (const table in result.update) {
            for (const key in result.update[table]) {
                const oldKey = result.update[table][key];
                this.getTable(table).emit('update', {source: this, changes: {[key]: oldKey}});
            }
        }
    }
}
