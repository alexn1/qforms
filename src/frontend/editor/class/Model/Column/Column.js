'use strict';

class Column extends Model {

    constructor(data, table) {
        super(data);
        this.table = table;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Column',
            action    : 'save',
            params    : {
                database: this.table.database.data['@attributes'].name,
                table   : this.table.data['@attributes'].name,
                column  : this.data['@attributes'].name,
                attr    : name,
                value   : value
            }
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Column',
            action    : 'delete',
            params    : {
                database: this.table.database.data['@attributes'].name,
                table   : this.table.data['@attributes'].name,
                column  : this.data['@attributes'].name,
            }
        });
    }

}
