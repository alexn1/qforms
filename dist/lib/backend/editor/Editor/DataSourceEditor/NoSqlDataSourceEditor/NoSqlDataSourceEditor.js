"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlDataSourceEditor = void 0;
const DataSourceEditor_1 = require("../DataSourceEditor");
const Editor_1 = require("../../Editor");
class NoSqlDataSourceEditor extends DataSourceEditor_1.DataSourceEditor {
    static createData(params) {
        return {
            '@class': 'NoSqlDataSource',
            '@attributes': Object.assign({}, DataSourceEditor_1.DataSourceEditor.createAttributes(params)),
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(Editor_1.Editor.createItemData) : []),
            ],
        };
    }
}
exports.NoSqlDataSourceEditor = NoSqlDataSourceEditor;
