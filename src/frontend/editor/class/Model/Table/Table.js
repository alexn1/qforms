class Table extends Model {
    constructor(data, database) {
        super(data, database);
        this.database = database;
        this.columns = [];
    }

    init() {
        for (const name in this.data.columns) {
            this.createColumn(this.data.columns[name]);
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
        return await QForms.doHttpRequest({
            controller: 'Column',
            action    : '_new',
            params    : Helper.encodeObject({
                database: this.database.data['@attributes'].name,
                table   : this.data['@attributes'].name,
                name    : name
            })
        });
    }
    async deleteData() {
        await QForms.doHttpRequest({
            controller: 'Table',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.database.data['@attributes'].name,
                table   : this.data['@attributes'].name
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeTable(this);
    }
}
