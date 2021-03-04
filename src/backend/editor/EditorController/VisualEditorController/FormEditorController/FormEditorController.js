const path = require('path');
const VisualEditorController = require('../VisualEditorController');

class FormEditorController extends VisualEditorController {

    constructor(...args) {
        super(...args);
        /*this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/DocumentController/VisualController/FormController'
        );*/
    }

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params['pageFileName']);
        const formEditor = await pageEditor.createForm(params);
        const formData = formEditor.getData();
        return formData;
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params['pageFileName']);
        const formEditor = pageEditor.createFormEditor(params.form);
        await formEditor.setAttr(params['attr'], params['value']);
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params['pageFileName']);
        await pageEditor.removeForm(params['form']);
        return null;
    }

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const result = await pageEditor.moveFormUp(params);
        return result;
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const result = await pageEditor.moveFormDown(params);
        return result;
    }

    /*async createView(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createFormEditor(params.form);
        const ejs = await formEditor.createEjs(params);
        const css = await formEditor.createCss(params);
        return {ejs, css};
    }*/

    async getView(params) {
        console.log('FormEditorController.getView');
        const result = await super.getView(params);
        switch (params.view) {
            case 'VisualView.html':
                const appEditor = await this.createApplicationEditor();
                const pageEditor = await appEditor.getPage(params.page);
                const formEditor = pageEditor.createFormEditor(params.form);
                // result.data.ejs = await formEditor.getCustomFile('ejs');
                // result.data.css = await formEditor.getCustomFile('css');
                result.data.js  = await formEditor.getCustomFile('js');
                return result;
            default:
                return result;
        }
    }

    async saveView(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createFormEditor(params.form);
        switch (params.view) {
            case 'ejs':
                await formEditor.saveCustomFile('ejs', params.text);
                return null;
            case 'css':
                await formEditor.saveCustomFile('css', params.text);
                return null;
        }
    }

    async createController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createFormEditor(params.form);
        const js = await formEditor.createJs(params);
        return {js};
    }

    async saveController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createFormEditor(params.form);
        await formEditor.saveCustomFile('js', params.text);
        return null;
    }

}

module.exports = FormEditorController;
