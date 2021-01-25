class Table extends Model {
    constructor(data, database) {
        super(data, database);
        this.database = database;
        this.columns = {};
    }

    init() {
        // columns
        for (const name in this.data.columns) {
            const columnData = this.data.columns[name];
            const column = new Column(columnData, this);
            column.init();
            this.columns[name] = column;
        }
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

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Table',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.database.data['@attributes'].name,
                table   : this.data['@attributes'].name
            })
        });
    }
}
