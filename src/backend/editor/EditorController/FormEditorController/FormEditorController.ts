const path = require('path');
const VisualEditorController = require('../VisualEditorController');

class FormEditorController extends VisualEditorController {

    /*constructor(...args) {
        super(...args);
    }*/

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params['pageFileName']);
        const data = await pageEditor.newFormData(params);
        await pageEditor.save();
        return data;
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params['pageFileName']);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        formEditor.setAttr(params['attr'], params['value']);
        await pageEditor.save();
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const data = pageEditor.removeColData('forms', params.form);
        await pageEditor.save();
        return data;
    }

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const result = await pageEditor.moveFormUp(params);
        await pageEditor.save();
        return result;
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const result = await pageEditor.moveFormDown(params);
        await pageEditor.save();
        return result;
    }

    async getView(params) {
        console.log('FormEditorController.getView');
        const result = await super.getView(params);
        switch (params.view) {
            case 'VisualView.html':
                const appEditor = await this.createApplicationEditor();
                const pageEditor = await appEditor.getPage(params.page);
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                result.data.js  = await formEditor.getCustomFile('js');
                return result;
            default:
                return result;
        }
    }

    /*async saveView(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        switch (params.view) {
            case 'ejs':
                await formEditor.saveCustomFile('ejs', params.text);
                return null;
            case 'css':
                await formEditor.saveCustomFile('css', params.text);
                return null;
        }
    }*/

    async createController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const js = await formEditor.createJs(params);
        return {js};
    }

    async saveController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        await formEditor.saveCustomFile('js', params.text);
        return null;
    }

    async createModelBackJs(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const js = await formEditor.createModelBackJs(params);
        return {js};
    }

}

export = FormEditorController;
