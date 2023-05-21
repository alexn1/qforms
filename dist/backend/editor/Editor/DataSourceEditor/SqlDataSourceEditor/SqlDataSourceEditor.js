"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlDataSourceEditor = void 0;
const DataSourceEditor_1 = require("../DataSourceEditor");
const Editor_1 = require("../../Editor");
class SqlDataSourceEditor extends DataSourceEditor_1.DataSourceEditor {
    static createData(params) {
        return {
            '@class': 'SqlDataSource',
            '@attributes': Object.assign(Object.assign({}, DataSourceEditor_1.DataSourceEditor.createAttributes(params)), { singleQuery: params.singleQuery ? params.singleQuery : '', multipleQuery: params.multipleQuery ? params.multipleQuery : '', countQuery: params.countQuery ? params.countQuery : '', limit: params.limit ? params.limit : '' }),
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(Editor_1.Editor.createItemData) : []),
            ],
        };
    }
}
exports.SqlDataSourceEditor = SqlDataSourceEditor;