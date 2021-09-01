const VisualEditorController = require('../VisualEditorController');

class FieldEditorController extends VisualEditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const data = formEditor.newItemData(params.class, 'fields', params);
        await pageEditor.save();
        return data;
    }
    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor  = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        fieldEditor.setAttr(params.attr, params.value);
        await pageEditor.save();
        return null;
    }
    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const data = formEditor.removeColData('fields', params.field);
        await pageEditor.save();
        return data;
    }
    async changeClass(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor  = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        const newData = fieldEditor.changeClass(params.class);
        await pageEditor.save();
        return newData;
    }

    async getView(params) {
        const result = await super.getView(params);
        switch (params.view) {
            case 'VisualView.html':
                const appEditor = await this.createApplicationEditor();
                const pageEditor = await appEditor.getPage(params.page);
                const formEditor  = pageEditor.createItemEditor('forms', params.form);
                const fieldEditor = formEditor.createItemEditor('fields', params.field);
                result.data.js = await fieldEditor.getCustomFile('js');
                return result;
            default:
                return result;
        }
    }

    async createController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor  = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        const js = await fieldEditor.createJs(params);
        return {js};
    }

    async saveController(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        await fieldEditor.saveCustomFile('js', params.text);
        return null;
    }

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const result = await formEditor.moveItemUp('fields', params);
        await pageEditor.save();
        return result;
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const result = await formEditor.moveItemDown('fields', params);
        await pageEditor.save();
        return result;
    }

}

export = FieldEditorController;
