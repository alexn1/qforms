class Table extends Model {
    constructor(...args) {
        super(...args);
        this.columns = {};
    }
    init() {
        // console.log('Table.init', this.getFullName());
        for (const data of this.data.columns) {
            const name = data.name;
            this.columns[name] = new Column(data, this);
            this.columns[name].init();
        }
    }

    getColumn(name) {
        if (!this.columns[name]) throw new Error(`table ${this.getFullName()}: no column ${name}`);
        return this.columns[name];
    }
}
