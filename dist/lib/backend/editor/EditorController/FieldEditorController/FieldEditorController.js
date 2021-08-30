const VisualEditorController = require('../VisualEditorController');

class FieldEditorController extends VisualEditorController {

    /*constructor(...args) {
        super(...args);
    }*/

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const data = formEditor.newFieldData(params);
        await pageEditor.save();
        return data;
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor  = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.createFieldEditor(params.field);
        await fieldEditor.setAttr(params.attr, params.value);
        await pageEditor.save();
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const data = formEditor.removeColData('fields', params.field);
        await pageEditor.save();
        return data;
    }

    async changeClass(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor  = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.createFieldEditor(params.field);
        const newFieldData = await fieldEditor.changeClass(params['class']);
        await pageEditor.save();
        return newFieldData;
    }

    async getView(params) {
        const result = await super.getView(params);
        switch (params.view) {
            case 'VisualView.html':
                const appEditor = await this.createApplicationEditor();
                const pageEditor = await appEditor.getPage(params.page);
                const formEditor  = pageEditor.createFormEditor(params.form);
                const fieldEditor = formEditor.createFieldEditor(params.field);
                result.data.js = await fieldEditor.getCustomFile('js');
                return result;
            default:
                return result;
        }
    }

    /*async saveView(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.createFieldEditor(params.field);
        switch (params.view) {
            case 'ejs':
                await fieldEditor.saveCustomFile('ejs', params.text);
                return null;
            case 'css':
                await fieldEditor.saveCustomFile('css', params.text);
                return null;
        }
    }*/

    async createController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor  = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.createFieldEditor(params.field);
        const js = await fieldEditor.createJs(params);
        return {js};
    }

    async saveController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createFormEditor(params.form);
        const fieldEditor = formEditor.createFieldEditor(params.field);
        await fieldEditor.saveCustomFile('js', params.text);
        return null;
    }

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const result = await formEditor.moveFieldUp(params);
        await pageEditor.save();
        return result;
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const result = await formEditor.moveFieldDown(params);
        await pageEditor.save();
        return result;
    }

}

module.exports = FieldEditorController;
