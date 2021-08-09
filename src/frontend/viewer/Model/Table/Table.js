class Table extends Model {
    constructor(...args) {
        super(...args);
        this.columns = [];
    }
    init() {
        // console.log('Table.init', this.getFullName());
        for (const data of this.data.columns) {
            const column = new Column(data, this);
            column.init();
            this.columns.push(column);
        }
    }

    getColumn(name) {
        const column = this.columns.find(column => column.getName() === name);
        if (!column) throw new Error(`table ${this.getFullName()}: no column ${name}`);
        return column;
    }
    emitInsert(source, inserts) {
        this.emit('insert', {source, inserts});
    }
    emitUpdate(source, changes) {
        this.emit('update', {source, changes});
    }

}
window.QForms.Table = Table;
