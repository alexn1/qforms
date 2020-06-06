'use strict';

class Param extends Model {

    constructor(data, database) {
        super(data);
        this.database = database;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Param',
            action    : 'save',
            params    : {
                database: this.database.data['@attributes'].name,
                param   : this.data['@attributes'].name,
                attr    : name,
                value   : value
            }
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Param',
            action    : 'delete',
            params    : {
                database: this.database.data['@attributes'].name,
                param   : this.data['@attributes'].name
            }
        });
    }

}
