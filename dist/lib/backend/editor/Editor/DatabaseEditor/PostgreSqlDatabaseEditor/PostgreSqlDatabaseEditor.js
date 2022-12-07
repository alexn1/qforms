"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSqlDatabaseEditor = void 0;
const DatabaseEditor_1 = require("../DatabaseEditor");
const Editor_1 = require("../../Editor");
class PostgreSqlDatabaseEditor extends DatabaseEditor_1.DatabaseEditor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'PostgreSqlDatabase',
            '@attributes': {
                name: params.name,
            },
            params: [...(params.params ? params.params.map(Editor_1.Editor.createItemData) : [])],
            tables: [...(params.tables ? params.tables.map(Editor_1.Editor.createItemData) : [])],
        };
    }
}
exports.PostgreSqlDatabaseEditor = PostgreSqlDatabaseEditor;
