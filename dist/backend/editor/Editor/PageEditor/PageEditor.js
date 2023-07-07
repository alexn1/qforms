"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageEditor = void 0;
const path_1 = __importDefault(require("path"));
const Editor_1 = require("../Editor");
class PageEditor extends Editor_1.Editor {
    constructor(appEditor, pageFile, editorPath) {
        super(pageFile.data, appEditor, editorPath);
        this.appEditor = appEditor;
        this.pageFile = pageFile;
    }
    static createData(params) {
        return {
            '@class': 'Page',
            '@attributes': {
                formatVersion: '0.1',
                name: params.name,
                caption: params.caption !== undefined ? params.caption : params.name,
                cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
                viewClass: params.viewClass !== undefined ? params.viewClass : '',
                ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
                modelClass: params.modelClass !== undefined ? params.modelClass : '',
                formInTab: params.formInTab !== undefined ? params.formInTab : 'false',
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor_1.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(Editor_1.Editor.createItemData) : [])],
            forms: [...(params.forms ? params.forms.map(Editor_1.Editor.createItemData) : [])],
        };
    }
    setAttr(name, value) {
        console.debug('PageEditor.setAttr', name, value);
        if (name === 'name') {
            const pageLinkEditor = this.appEditor.createItemEditor('pageLinks', this.getName());
            pageLinkEditor.setAttr(name, value);
        }
        super.setAttr(name, value);
    }
    async save() {
        await this.pageFile.save();
    }
    async createJs(params) {
        const templateFilePath = path_1.default.join(this.getEditorPath(), 'Editor/PageEditor/Page.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }
    async createJsx(params) {
        const templateFilePath = path_1.default.join(this.getEditorPath(), 'Editor/PageEditor/age.jsx.ejs');
        const customJsxFilePath = await this.getCustomFilePath('jsx');
        const jsx = await this.createFileByParams(customJsxFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return jsx;
    }
    async createLess(params) {
        const templateFilePath = path_1.default.join(this.getEditorPath(), 'Editor/PageEditor/Page.less.ejs');
        const customLessFilePath = await this.getCustomFilePath('less');
        const less = await this.createFileByParams(customLessFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return less;
    }
    async createModelBackJs(params) {
        const filePath = path_1.default.join(await this.getCustomDirPath(), 'Editor/PageEditor/Model.back.js');
        const templateFilePath = path_1.default.join(this.getEditorPath(), 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            name: this.getName(),
        });
        return js;
    }
    async getCustomDirPath() {
        console.debug('PageEditor.getCustomDirPath');
        const customDirPath = await this.getParent().getCustomDirPath();
        return path_1.default.join(customDirPath, 'pages', this.getName());
    }
    reformat() {
        this.data = this.pageFile.data = PageEditor.createData(Object.assign(Object.assign({}, this.attributes()), { dataSources: this.data.dataSources, actions: this.data.actions, forms: this.data.forms }));
    }
}
exports.PageEditor = PageEditor;
