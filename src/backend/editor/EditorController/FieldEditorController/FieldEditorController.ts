const VisualEditorController = require('../VisualEditorController');

class FieldEditorController extends VisualEditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async _new(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const data = formEditor.newItemData(params.class, 'fields', params);
        await pageEditor.save();
        return data;
    }
    async save(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor  = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        fieldEditor.setAttr(params.attr, params.value);
        await pageEditor.save();
        return null;
    }
    async delete(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const data = formEditor.removeColData('fields', params.field);
        await pageEditor.save();
        return data;
    }
    async changeClass(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor  = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        const newData = fieldEditor.changeClass(params.class);
        await pageEditor.save();
        return newData;
    }

    async getView(params) {
        const result = await super.getView(params);
        if (params.view === 'VisualView.html') {
            const appEditor = this.createApplicationEditor();
            const pageEditor = await appEditor.getPage(params.page);
            const formEditor  = pageEditor.createItemEditor('forms', params.form);
            const fieldEditor = formEditor.createItemEditor('fields', params.field);
            result.data.js   = await fieldEditor.getCustomFile('js');
            result.data.jsx  = await fieldEditor.getCustomFile('jsx');
            result.data.less = await fieldEditor.getCustomFile('less');
            return result;
        }
        return result;
    }

    async createController(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor  = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        const js = await fieldEditor.createJs(params);
        return {js};
    }

    async saveController(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        await fieldEditor.saveCustomFile('js', params.text);
        return {js: params.text};
    }

    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        formEditor.moveItemUp('fields', params.field);
        await pageEditor.save();
        return 'ok';
    }

    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        formEditor.moveItemDown('fields', params.field);
        await pageEditor.save();
        return 'ok';
    }

}

export = FieldEditorController;
