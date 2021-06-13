class Column extends Editor {

    constructor(data, table) {
        super(data, table);
        this.table = table;
    }

    async setValue(name, value) {
        //console.log('Column.setValue', name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Column',
            action    : 'save',
            params    : Helper.encodeObject({
                database: this.table.database.getName(),
                table   : this.table.getName(),
                column  : this.getName(),
                attr    : name,
                value   : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Column',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.table.database.getName(),
                table   : this.table.getName(),
                column  : this.getName(),
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeColumn(this);
    }

}
