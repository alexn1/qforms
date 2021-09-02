"use strict";
const Editor = require('../Editor');
class ColumnEditor extends Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        if (typeof params.key !== 'string')
            throw new Error('key not string');
        if (typeof params.auto !== 'string')
            throw new Error('auto not string');
        if (typeof params.nullable !== 'string')
            throw new Error('nullable not string');
        return {
            '@class': 'Column',
            '@attributes': {
                name: params.name,
                caption: params.caption || params.name,
                type: params.type || '',
                dbType: params.dbType || '',
                key: params.key || 'false',
                auto: params.auto || 'false',
                nullable: params.nullable || 'true',
            }
        };
    }
    getColName() {
        return 'columns';
    }
}
module.exports = ColumnEditor;
