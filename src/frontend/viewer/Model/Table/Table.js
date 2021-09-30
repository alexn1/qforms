class Table extends Model {
    constructor(data, parent) {
        super(data, parent);
        this.columns = [];
    }
    init() {
        // console.log('Table.init', this.getFullName());
        for (const data of this.data.columns) {
            const column = new Column(data, this);
            column.init();
            this.addColumn(column);
        }
    }
    addColumn(column) {
        this.columns.push(column);
    }
    getColumn(name) {
        const column = this.columns.find(column => column.getName() === name);
        if (!column) throw new Error(`table ${this.getFullName()}: no column ${name}`);
        return column;
    }
    emitResult(result, source = null) {
        console.log('Table.emitResult');
        return [
            ...(result.insert ? [this.emitInsert(source, result.insert)] : []),
            ...(result.update ? [this.emitUpdate(source, result.update)] : []),
            ...(result.delete ? [this.emitDelete(source, result.delete)] : [])
        ];
    }
    emitInsert(source, inserts) {
        return this.emit('insert', {source, inserts});
    }
    emitUpdate(source, updates) {
        return this.emit('update', {source, updates});
    }
    emitDelete(source, deletes) {
        return this.emit('delete', {source, deletes});
    }
}
window.QForms.Table = Table;
