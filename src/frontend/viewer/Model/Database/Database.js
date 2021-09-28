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
        for (const table in result) {
            this.getTable(table).emitResult(result[table], source);
        }
    }
}
window.QForms.Database = Database;
