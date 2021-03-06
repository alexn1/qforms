const Editor = require('../Editor');

class ColumnEditor extends Editor {

    constructor(...args) {
        super(...args);
        // this.colName = 'columns';
    }

    static createData(params) {
        if (!params.name) throw new Error('no name');
        return {
            '@class'     : 'Column',
            '@attributes': {
                name    : params.name,
                caption : params.caption || params.name,
                type    : params.type || '',
                dbType  : params.dbType || '',
                key     : params.key      ? 'true' : 'false',
                auto    : params.auto     ? 'true' : 'false',
                nullable: params.nullable ? 'true' : 'false',
            }
        };
    }

}

module.exports = ColumnEditor;
