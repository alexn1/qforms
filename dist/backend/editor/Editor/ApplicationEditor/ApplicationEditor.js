"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationEditor = void 0;
const path_1 = __importDefault(require("path"));
const Editor_1 = require("../Editor");
const BkHelper_1 = require("../../../BkHelper");
const BkApplication_1 = require("../../../viewer/BkModel/BkApplication/BkApplication");
const JsonFile_1 = require("../../../JsonFile");
const PageEditor_1 = require("../PageEditor/PageEditor");
class ApplicationEditor extends Editor_1.Editor {
    constructor(appFile, editorPath) {
        super(appFile.data);
        this.appFile = appFile;
        this.editorPath = editorPath;
        this.appInfo = BkApplication_1.BkApplication.makeAppInfoFromAppFile(appFile);
    }
    getAppFile() {
        return this.appFile;
    }
    static createData(params) {
        // console.debug('ApplicationEditor.createData', params);
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'Application',
            '@attributes': {
                formatVersion: '0.1',
                name: params.name,
                caption: params.caption || params.name,
                authentication: params.authentication || 'false',
                user: params.user || 'admin',
                password: params.password || 'admin',
                lang: params.lang || 'en',
                theme: params.theme || 'standard',
                cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
                viewClass: params.viewClass !== undefined ? params.viewClass : '',
                ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
                modelClass: params.modelClass !== undefined ? params.modelClass : '',
            },
            env: params.env ? params.env : {},
            databases: [...(params.databases ? params.databases.map(Editor_1.Editor.createItemData) : [])],
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor_1.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(Editor_1.Editor.createItemData) : [])],
            pageLinks: [...(params.pageLinks ? params.pageLinks.map(Editor_1.Editor.createItemData) : [])],
        };
    }
    static async createAppFile(appFilePath, params) {
        const data = ApplicationEditor.createData(params);
        const appFile = new JsonFile_1.JsonFile(appFilePath, data);
        await appFile.create();
        return appFile;
    }
    async newPageAndPageLinkData(params) {
        const pagesDirPath = path_1.default.join(this.appInfo.dirPath, 'pages');
        const pageDirPath = path_1.default.join(pagesDirPath, params.name);
        const pageFilePath = path_1.default.join(pageDirPath, params.name + '.json');
        const pageData = PageEditor_1.PageEditor.createData(params);
        const pageFile = new JsonFile_1.JsonFile(pageFilePath, pageData);
        await pageFile.create();
        const pageLinkData = this.newItemData('PageLink', 'pageLinks', params);
        return {
            page: pageData,
            pageLink: pageLinkData,
        };
    }
    async save() {
        console.debug('ApplicationEditor.save');
        await this.appFile.save();
    }
    async removePageFile(name) {
        const pageLinkEditor = this.createItemEditor('pageLinks', name);
        const pageFilePath = path_1.default.join(this.appInfo.dirPath, pageLinkEditor.getAttr('fileName'));
        await BkHelper_1.BkHelper.fsUnlink(pageFilePath);
    }
    async createPageEditor(relFilePath) {
        const pageFilePath = path_1.default.join(this.appInfo.dirPath, relFilePath);
        const pageFile = new JsonFile_1.JsonFile(pageFilePath);
        await pageFile.read();
        return new PageEditor_1.PageEditor(this, pageFile);
    }
    async getPage(name) {
        const pageLinkEditor = this.createItemEditor('pageLinks', name);
        const relFilePath = pageLinkEditor.getAttr('fileName');
        return await this.createPageEditor(relFilePath);
    }
    async createJs(params) {
        const customJsFilePath = await this.getCustomFilePath('js');
        const templateFilePath = path_1.default.join(this.editorPath, 'Editor/ApplicationEditor/Application.js.ejs');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            application: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }
    async createModelBackJs(params) {
        const filePath = path_1.default.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path_1.default.join(this.editorPath, 'Editor/ApplicationEditor/Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            name: this.getName(),
        });
        return js;
    }
    async getCustomDirPath() {
        return this.appInfo.dirPath;
    }
    reformat() {
        this.data = this.appFile.data = ApplicationEditor.createData(Object.assign(Object.assign({}, this.attributes()), { env: this.data.env, databases: this.data.databases, dataSources: this.data.dataSources, actions: this.data.actions, pageLinks: this.data.pageLinks }));
    }
}
exports.ApplicationEditor = ApplicationEditor;
