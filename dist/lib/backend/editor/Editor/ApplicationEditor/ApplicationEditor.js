"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path = require('path');
const Editor = require('../Editor');
const Helper = require('../../../Helper');
const Application = require('../../../viewer/Model/Application/Application');
const backend = require('../../../../backend');
const JsonFile_1 = __importDefault(require("../../../JsonFile"));
const PageEditor_1 = __importDefault(require("../PageEditor/PageEditor"));
class ApplicationEditor extends Editor {
    constructor(appFile) {
        super(appFile.data);
        this.appFile = appFile;
        this.appInfo = Application.getAppInfoFromData(appFile.filePath, appFile.data);
    }
    static createData(params) {
        // console.log('ApplicationEditor.createData', params);
        return {
            '@class': 'Application',
            '@attributes': {
                formatVersion: '0.1',
                name: params.name,
                caption: params.name,
                authentication: 'false',
                user: 'admin',
                password: 'admin',
                lang: 'en',
                theme: 'standard'
            },
            env: params.env ? params.env : {},
            databases: [
                ...(params.databases ? params.databases.map(Editor.createItemData) : [])
            ],
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor.createItemData) : [])
            ],
            actions: [
                ...(params.actions ? params.actions.map(Editor.createItemData) : [])
            ],
            pageLinks: [
                ...(params.pageLinks ? params.pageLinks.map(Editor.createItemData) : [])
            ],
        };
    }
    static async createAppFile(appFilePath, params) {
        const data = ApplicationEditor.createData(params);
        const appFile = new JsonFile_1.default(appFilePath, data);
        await appFile.create();
        return appFile;
    }
    async newPageAndPageLinkData(params) {
        const pagesDirPath = path.join(this.appInfo.dirPath, 'pages');
        const pageDirPath = path.join(pagesDirPath, params.name);
        const pageFilePath = path.join(pageDirPath, params.name + '.json');
        const pageData = PageEditor_1.default.createData(params);
        const pageFile = new JsonFile_1.default(pageFilePath, pageData);
        await pageFile.create();
        const pageLinkData = this.newItemData('PageLink', 'pageLinks', params);
        return {
            page: pageData,
            pageLink: pageLinkData
        };
    }
    async save() {
        console.log('ApplicationEditor.save');
        await this.appFile.save();
    }
    async removePageFile(name) {
        const pageLinkEditor = this.createItemEditor('pageLinks', name);
        const pageFilePath = path.join(this.appInfo.dirPath, pageLinkEditor.getAttr('fileName'));
        await Helper.fsUnlink(pageFilePath);
    }
    async createPageEditor(relFilePath) {
        const pageFilePath = path.join(this.appInfo.dirPath, relFilePath);
        const pageFile = new JsonFile_1.default(pageFilePath);
        await pageFile.read();
        return new PageEditor_1.default(this, pageFile);
    }
    async getPage(name) {
        const pageLinkEditor = this.createItemEditor('pageLinks', name);
        const relFilePath = pageLinkEditor.getAttr('fileName');
        return await this.createPageEditor(relFilePath);
    }
    async createJs(params) {
        const customJsFilePath = await this.getCustomFilePath('js');
        const templateFilePath = path.join(__dirname, 'Application.js.ejs');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            application: this.getName(),
            _class: this.constructor.name.replace('Editor', '')
        });
        return js;
    }
    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path.join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            name: this.getName(),
        });
        return js;
    }
    async getCustomDirPath() {
        return this.appInfo.dirPath;
    }
}
module.exports = ApplicationEditor;
