class Column extends Model {

    constructor(data, table) {
        super(data, table);
        this.table = table;
    }

    async setValue(name, value) {
        //console.log('Column.setValue', name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Column',
            action    : 'save',
            params    : Helper.encodeObject({
                database: this.table.database.data['@attributes'].name,
                table   : this.table.data['@attributes'].name,
                column  : this.data['@attributes'].name,
                attr    : name,
                value   : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Column',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.table.database.data['@attributes'].name,
                table   : this.table.data['@attributes'].name,
                column  : this.data['@attributes'].name,
            })
        });
    }

}
