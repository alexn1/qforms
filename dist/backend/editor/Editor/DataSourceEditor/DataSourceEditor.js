"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceEditor = void 0;
const path_1 = __importDefault(require("path"));
const ApplicationEditor_1 = require("../ApplicationEditor/ApplicationEditor");
const PageEditor_1 = require("../PageEditor/PageEditor");
const Editor_1 = require("../Editor");
class DataSourceEditor extends Editor_1.Editor {
    static createData(params) {
        return {
            '@class': 'DataSource',
            '@attributes': Object.assign({}, DataSourceEditor.createAttributes(params)),
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(Editor_1.Editor.createItemData) : []),
            ],
        };
    }
    static createAttributes(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            name: params.name,
            database: params.database || 'default',
            table: params.table || '',
            modelClass: params.modelClass !== undefined ? params.modelClass : '',
        };
    }
    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path_1.default.join(customDirPath, 'dataSources');
    }
    async createModelBackJs(params) {
        const filePath = path_1.default.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path_1.default.join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            _class: this.getClassName(),
            page: params.page ? params.page : '',
            form: params.form ? params.form : '',
            dataSource: this.getName(),
        });
        return js;
    }
    getColName() {
        return 'dataSources';
    }
    async save() {
        if (this.parent instanceof ApplicationEditor_1.ApplicationEditor) {
            await this.parent.appFile.save();
        }
        else if (this.parent instanceof PageEditor_1.PageEditor) {
            await this.parent.pageFile.save();
        }
        else {
            await this.parent.getParent().pageFile.save();
        }
    }
}
exports.DataSourceEditor = DataSourceEditor;