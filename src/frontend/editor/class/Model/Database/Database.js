'use strict';

class Database extends Model {

    constructor(data) {
        super(data);
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Database',
            action    : 'save',
            params    : {
                database: this.data['@attributes'].name,
                attr    : name,
                value   : value
            }
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Database',
            action    : 'delete',
            params    : {
                database: this.data['@attributes'].name
            }
        });
    }

    async newParam(name) {
        return await QForms.doHttpRequest({
            controller: 'Param',
            action    : '_new',
            params    : {
                database: this.data['@attributes'].name,
                name    : name
            }
        });
    }

    async newTable(params) {
        if (!params.name) throw new Error('newTable: no name');
        return await QForms.doHttpRequest({
            controller: 'Table',
            action    : '_new',
            params    : {
                database: this.data['@attributes'].name,
                name    : params.name,
                columns : params.columns
            }
        });
    }

    async getView(view) {
        console.log('Database.getView', view);
        return await QForms.doHttpRequest({
            controller: 'Database',
            action    : 'getView',
            params    : {
                view    : view,
                database: this.data !== undefined ? this.data['@attributes'].name : null
            }
        });
    }

    async getTableInfo(table) {
        return await QForms.doHttpRequest({
            controller: 'Database',
            action    : 'getTableInfo',
            params    : {
                database: this.data !== undefined ? this.data['@attributes'].name : null,
                table   : table
            }
        });
    }

}
