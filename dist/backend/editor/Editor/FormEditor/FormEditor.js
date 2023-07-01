"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormEditor = void 0;
const path_1 = __importDefault(require("path"));
const Editor_1 = require("../Editor");
class FormEditor extends Editor_1.Editor {
    static createAttributes(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            name: params.name,
            caption: params.caption !== undefined ? params.caption : params.name,
            visible: params.visible !== undefined ? params.visible : 'true',
            cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
            viewClass: params.viewClass !== undefined ? params.viewClass : '',
            ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
            modelClass: params.modelClass !== undefined ? params.modelClass : '',
        };
    }
    static createData(params) {
        console.log('FormEditor.createData', params);
        return {
            '@class': 'Form',
            '@attributes': Object.assign({}, FormEditor.createAttributes(params)),
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor_1.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(Editor_1.Editor.createItemData) : [])],
            fields: [...(params.fields ? params.fields.map(Editor_1.Editor.createItemData) : [])],
        };
    }
    async createJs(params) {
        const templateFilePath = path_1.default.join(__dirname, 'Form.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.getParent().getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }
    async createJsx(params) {
        const templateFilePath = path_1.default.join(__dirname, 'Form.jsx.ejs');
        const customFilePath = await this.getCustomFilePath('jsx');
        const jsx = await this.createFileByParams(customFilePath, templateFilePath, {
            page: this.getParent().getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return jsx;
    }
    async createLess(params) {
        const templateFilePath = path_1.default.join(__dirname, 'Form.less.ejs');
        const customFilePath = await this.getCustomFilePath('less');
        const less = await this.createFileByParams(customFilePath, templateFilePath, {
            page: this.getParent().getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return less;
    }
    async createModelBackJs(params) {
        const filePath = path_1.default.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path_1.default.join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            page: this.getParent().getName(),
            form: this.getName(),
            _class: this.getClassName(),
        });
        return js;
    }
    async getCollectionDirPath() {
        const customDirPath = await this.getParent().getCustomDirPath();
        return path_1.default.join(customDirPath, 'forms');
    }
    getColName() {
        return 'forms';
    }
}
exports.FormEditor = FormEditor;
