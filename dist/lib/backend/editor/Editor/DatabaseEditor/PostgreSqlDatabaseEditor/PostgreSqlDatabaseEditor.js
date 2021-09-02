"use strict";
const DatabaseEditor = require('../DatabaseEditor');
const Editor = require('../../Editor');
class PostgreSqlDatabaseEditor extends DatabaseEditor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'PostgreSqlDatabase',
            '@attributes': {
                name: params.name
            },
            params: [
                ...(params.params ? params.params.map(Editor.createItemData) : [])
            ],
            tables: [
                ...(params.tables ? params.tables.map(Editor.createItemData) : [])
            ],
        };
    }
}
module.exports = PostgreSqlDatabaseEditor;
