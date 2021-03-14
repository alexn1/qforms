const EditorController = require('../EditorController');

class ActionEditorController extends EditorController {

    async _new(params) {
        console.log('ActionEditorController._new');
        if (!params.pageFileName) throw new Error('no pageFileName');
        if (!params.form)         throw new Error('no form');
        if (!params.name)         throw new Error('no name');
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const data = await formEditor.newActionData(params);
        await pageEditor.save();
        return data;
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const actionEditor = formEditor.createActionEditor(params.action);
        await actionEditor.setAttr(params.attr, params.value);
        await pageEditor.save();
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const data = formEditor.removeColData('actions', params.action);
        await pageEditor.save();
        return data;
    }
}
module.exports = ActionEditorController;
