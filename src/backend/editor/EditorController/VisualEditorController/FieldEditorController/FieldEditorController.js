const path = require('path');
const VisualEditorController = require('../VisualEditorController');

class FieldEditorController extends VisualEditorController {

    constructor(...args) {
        super(...args);
        /*this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/DocumentController/VisualController/FieldController'
        );*/
    }

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const fieldData = formEditor.newField(params);
        await pageEditor.save();
        return fieldData;
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor  = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.getField(params.field);
        await fieldEditor.setAttr(params.attr, params.value);
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        await formEditor.removeField(params.field);
        return null;
    }

    async changeClass(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor  = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.getField(params.field);
        const newFieldData = await fieldEditor.changeClass(params['class']);
        return newFieldData;
    }

    /*async createView(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor  = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.getField(params.field);
        const ejs = await fieldEditor.createEjs(params);
        const css = await fieldEditor.createCss(params);
        return {ejs, css};
    }*/

    async getView(params) {
        const result = await super.getView(params);
        switch (params.view) {
            case 'VisualView.html':
                const appEditor = await this.createApplicationEditor();
                const pageEditor = await appEditor.getPage(params.page);
                const formEditor  = pageEditor.createFormEditor(params.form);
                const fieldEditor = formEditor.getField(params.field);
                // result.data.ejs = await fieldEditor.getCustomFile('ejs');
                // result.data.css = await fieldEditor.getCustomFile('css');
                result.data.js = await fieldEditor.getCustomFile('js');
                return result;
            default:
                return result;
        }
    }

    async saveView(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.getField(params.field);
        switch (params.view) {
            case 'ejs':
                await fieldEditor.saveCustomFile('ejs', params.text);
                return null;
            case 'css':
                await fieldEditor.saveCustomFile('css', params.text);
                return null;
        }
    }

    async createController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor  = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.getField(params.field);
        const js = await fieldEditor.createJs(params);
        return {js};
    }

    async saveController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.getField(params.field);
        await fieldEditor.saveCustomFile('js', params.text);
        return null;
    }

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const result = await formEditor.moveFieldUp(params);
        return result;
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const result = await formEditor.moveFieldDown(params);
        return result;
    }

}

module.exports = FieldEditorController;
