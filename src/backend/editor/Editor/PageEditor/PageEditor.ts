const path = require('path');

import ApplicationEditor from '../ApplicationEditor/ApplicationEditor';
import JsonFile from '../../../JsonFile';
const Editor = require('../Editor');

class PageEditor extends Editor {
    appEditor: ApplicationEditor;
    pageFile: JsonFile;
    constructor(appEditor, pageFile) {
        super(pageFile.data, appEditor);
        this.appEditor = appEditor;
        this.pageFile  = pageFile;
    }
    static createData(params) {
        return {
            '@class'     :'Page',
            '@attributes': {
                formatVersion: '0.1',
                name     : params.name,
                caption  : params.caption   !== undefined ? params.caption   : params.name,
                cssBlock : params.cssBlock  !== undefined ? params.cssBlock  :          '',
                viewClass: params.viewClass !== undefined ? params.viewClass :          '',
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor.createItemData) : [])
            ],
            actions: [
                ...(params.actions ? params.actions.map(Editor.createItemData) : [])
            ],
            forms: [
                ...(params.forms ? params.forms.map(Editor.createItemData) : [])
            ],
        };
    }
    setAttr(name, value) {
        console.log('PageEditor.setAttr', name, value);
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
        const templateFilePath = path.join(__dirname, 'Page.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page  : this.getName(),
            _class: this.constructor.name.replace('Editor', '')
        });
        return js;
    }
    async createJsx(params) {
        const templateFilePath = path.join(__dirname, 'Page.jsx.ejs');
        const customJsxFilePath = await this.getCustomFilePath('jsx');
        const jsx = await this.createFileByParams(customJsxFilePath, templateFilePath, {
            page  : this.getName(),
            _class: this.constructor.name.replace('Editor', '')
        });
        return jsx;
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
        console.log('PageEditor.getCustomDirPath');
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'pages', this.getName());
    }
    reformat() {
        this.data = this.pageFile.data = PageEditor.createData({
            ...this.attributes(),
            dataSources: this.data.dataSources,
            actions    : this.data.actions,
            forms      : this.data.forms,
        });
    }
}

export = PageEditor;
