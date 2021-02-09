class Database extends Model {

    constructor(data, application) {
        super(data, application);
        this.params = [];
        this.tables = [];
    }

    init() {

        // params
        for (const name in this.data.params) {
            this.createParam(this.data.params[name]);
        }

        // tables
        for (const name in this.data.tables) {
            this.createTable(this.data.tables[name]);
        }
    }

    createParam(data) {
        const param = new Param(data, this);
        param.init();
        this.params.push(param);
        return param;
    }

    createTable(data) {
        const table = new Table(data, this);
        table.init();
        this.tables.push(table);
        return table;
    }
    removeParam(param) {
        console.log('Database.removeParam', param.getName());
        const i = this.params.indexOf(param);
        if (i == -1) throw new Error('no such param');
        this.params.splice(i, 1);
    }
    removeTable(table) {
        console.log('Database.removeTable', table.getName());
        const i = this.tables.indexOf(table);
        if (i == -1) throw new Error('no such table');
        this.tables.splice(i, 1);
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Database',
            action    : 'save',
            params    : Helper.encodeObject({
                database: this.data['@attributes'].name,
                attr    : name,
                value   : value
            })
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async deleteData() {
        return await QForms.doHttpRequest({
            controller: 'Database',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.data['@attributes'].name
            })
        });
    }

    async delete() {
        await this.deleteData();
        this.parent.removeDatabase(this);
    }

    async newParam(name) {
        return await QForms.doHttpRequest({
            controller: 'Param',
            action    : '_new',
            params    : Helper.encodeObject({
                database: this.data['@attributes'].name,
                name    : name
            })
        });
    }

    async newTable(params) {
        if (!params.name) throw new Error('newTable: no name');
        return await QForms.doHttpRequest({
            controller: 'Table',
            action    : '_new',
            params    : Helper.encodeObject({
                database: this.data['@attributes'].name,
                name    : params.name,
                columns : params.columns
            })
        });
    }

    async getView(view) {
        console.log('Database.getView', view);
        return await QForms.doHttpRequest({
            controller: 'Database',
            action    : 'getView',
            params    : Helper.encodeObject({
                view    : view,
                database: this.data !== undefined ? this.data['@attributes'].name : null
            })
        });
    }

    async getTableInfo(table) {
        return await QForms.doHttpRequest({
            controller: 'Database',
            action    : 'getTableInfo',
            params    : Helper.encodeObject({
                database: this.data !== undefined ? this.data['@attributes'].name : null,
                table   : table
            })
        });
    }

}
