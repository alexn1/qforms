const path = require('path');
const qforms                 = require('../../../../qforms');
const VisualEditorController = require('../VisualEditorController');

class PageEditorController extends VisualEditorController {

    /*constructor(...args) {
        super(...args);
    }*/

    async get(params) {
        const pageFilePath = path.join(this.appInfo.dirPath, params.fileName);
        const content = await qforms.Helper.readTextFile(pageFilePath);
        return JSON.parse(content);
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.fileName);
        await pageEditor.setAttr(params.attr, params.value);
        return null;
    }

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPage(params);
        const pageLinkEditor = appEditor.createPageLinkEditor(params.name);
        return {
            page    : pageEditor.getData(),
            pageLink: pageLinkEditor.getData()
        };
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        await appEditor.removePageFile(params.page);
        const data = appEditor.removeColData('pageLinks', params.page);
        await appEditor.save();
        return data;
    }

    async getView(params) {
        const result = await super.getView(params);
        switch (params.view) {
            case 'VisualView.html':
                const appEditor = await this.createApplicationEditor();
                const pageEditor = await appEditor.getPage(params.page);
                result.data.js = await pageEditor.getCustomFile('js');
                return result;
            default:
                return result;
        }
    }

    /*async saveView(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        switch (params.view) {
            case 'ejs':
                await pageEditor.saveCustomFile('ejs', params.text);
                return null;
            case 'css':
                await pageEditor.saveCustomFile('css', params.text);
                return null;
        }
    }*/

    async createController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const js = await pageEditor.createJs(params);
        return {js};
    }

    async saveController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        await pageEditor.saveCustomFile('js', params.text);
        return null;
    }

}

module.exports = PageEditorController;
