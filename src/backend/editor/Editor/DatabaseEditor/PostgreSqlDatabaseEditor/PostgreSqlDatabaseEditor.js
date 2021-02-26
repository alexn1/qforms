const DatabaseEditor = require('../DatabaseEditor');

class PostgreSqlDatabaseEditor extends DatabaseEditor {
    static createData(params) {
        if (!params.name) throw new Error('no name');
        return {
            '@class'      : 'PostgreSqlDatabase',
            '@attributes' : {
                name : params.name
            },
            params: {},
            tables: {},
            params2: [],
            tables2: [],
        };
    }
}
module.exports = PostgreSqlDatabaseEditor;
