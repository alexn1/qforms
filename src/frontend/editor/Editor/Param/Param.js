class Param extends Editor {

    constructor(data, database) {
        super(data, database);
        this.database = database;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Param',
            action    : 'save',
            params    : Helper.encodeObject({
                database: this.database.getName(),
                param   : this.getName(),
                attr    : name,
                value   : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Param',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.database.getName(),
                param   : this.getName()
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeParam(this);
    }
}
