class Database extends Model {

    constructor(data) {
        super(data);
        this.params = [];
        this.tables = {};
    }

    init() {

        // params
        for (const name in this.data.params) {
            this.createParam(this.data.params[name]);
        }

        // tables
        for (const name in this.data.tables) {
            this.createTable(this.data.tables[name], name);
        }
    }

    createParam(data) {
        const param = new Param(data, this);
        param.init();
        this.params.push(param);
    }

    createTable(data, name) {
        const table = new Table(data, this);
        table.init();
        this.tables[name] = table;
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

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Database',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.data['@attributes'].name
            })
        });
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
