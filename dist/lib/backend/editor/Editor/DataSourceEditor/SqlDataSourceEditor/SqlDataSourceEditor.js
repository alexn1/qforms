"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const DataSourceEditor = require('../DataSourceEditor');
const KeyColumnEditor_1 = __importDefault(require("../../KeyColumnEditor/KeyColumnEditor"));
class SqlDataSourceEditor extends DataSourceEditor {
    static createData(params) {
        return {
            '@class': 'SqlDataSource',
            '@attributes': {
                name: params.name,
                database: params.database ? params.database : 'default',
                table: params.table ? params.table : '',
                singleQuery: params.singleQuery ? params.singleQuery : '',
                multipleQuery: params.multipleQuery ? params.multipleQuery : '',
                countQuery: params.countQuery ? params.countQuery : '',
                limit: params.limit ? params.limit : '',
            },
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(keyColumnParams => KeyColumnEditor_1.default.createData(keyColumnParams)) : [])
            ],
        };
    }
}
module.exports = SqlDataSourceEditor;
