class Table extends Model {
    constructor(data, database) {
        super(data, database);
        this.database = database;
        this.columns = [];
    }

    init() {
        for (const data of this.data.columns) {
            this.createColumn(data);
        }
    }

    createColumn(data) {
        const column = new Column(data, this);
        column.init();
        this.columns.push(column);
        return column;
    }
    removeColumn(column) {
        console.log('Table.removeColumn', column.getName());
        const i = this.columns.indexOf(column);
        if (i === -1) throw new Error('no such column');
        this.columns.splice(i, 1);
    }

    async newColumn(name) {
        if (!name) throw new Error(`newColumn: no name`);
        const data = await QForms.doHttpRequest({
            controller: 'Column',
            action    : '_new',
            params    : Helper.encodeObject({
                database: this.database.getName(),
                table   : this.getName(),
                name    : name
            })
        });
        return this.createColumn(data);
    }
    async deleteData() {
        await QForms.doHttpRequest({
            controller: 'Table',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.database.getName(),
                table   : this.getName()
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeTable(this);
    }

    moveUp() {
        return QForms.doHttpRequest({
            controller : 'Table',
            action     : 'moveUp',
            params     : Helper.encodeObject({
                database: this.database.getName(),
                table   : this.getName()
            })
        });
    }

    moveDown() {
        return QForms.doHttpRequest({
            controller : 'Table',
            action     : 'moveDown',
            params     : Helper.encodeObject({
                database: this.database.getName(),
                table   : this.getName()
            })
        });
    }

}
