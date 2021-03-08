class Database extends Model {
    constructor(...args) {
        super(...args);
        this.tables = {};
    }

    init() {
        // console.log('Database.init', this.getName());
        for (const data of this.data.tables) {
            this.tables[data.name] = new Table(data, this);
            this.tables[data.name].init();
        }
    }

    getTable(name) {
        if (!this.tables[name]) throw new Error(`no table with name: ${name}`);
        return this.tables[name];
    }
}
