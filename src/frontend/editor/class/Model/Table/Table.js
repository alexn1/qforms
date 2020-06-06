'use strict';

class Table extends Model {
    constructor(data, database) {
        super(data);
        this.database = database;
    }

    async newColumn(name) {
        if (!name) throw new Error(`newColumn: no name`);
        return await QForms.doHttpRequest({
            controller: 'Column',
            action    : '_new',
            params    : {
                database: this.database.data['@attributes'].name,
                table   : this.data['@attributes'].name,
                name    : name
            }
        });
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Table',
            action    : 'delete',
            params    : {
                database: this.database.data['@attributes'].name,
                table   : this.data['@attributes'].name
            }
        });
    }
}
