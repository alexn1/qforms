"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlDatabaseEditor = void 0;
const DatabaseEditor_1 = require("../DatabaseEditor");
const Editor = require('../../Editor');
class MySqlDatabaseEditor extends DatabaseEditor_1.DatabaseEditor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'MySqlDatabase',
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
exports.MySqlDatabaseEditor = MySqlDatabaseEditor;
