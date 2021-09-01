"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path = require('path');
const Editor = require('../Editor');
const KeyColumnEditor_1 = __importDefault(require("../KeyColumnEditor/KeyColumnEditor"));
class DataSourceEditor extends Editor {
    static createData(params) {
        return {
            '@class': 'DataSource',
            '@attributes': {
                name: params.name,
                database: params.database ? params.database : 'default',
                table: params.table ? params.table : '',
            },
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(keyColumnParams => KeyColumnEditor_1.default.createData(keyColumnParams)) : [])
            ],
        };
    }
    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'dataSources');
    }
    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path.join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            _class: this.getClassName(),
            page: params.page ? params.page : '',
            form: params.form ? params.form : '',
            dataSource: this.getName(),
        });
        return js;
    }
}
module.exports = DataSourceEditor;
