const EditorController = require('../EditorController');

class ActionEditorController extends EditorController {

    async _new(params) {
        console.log('ActionEditorController._new');
        // if (!params.pageFileName) throw new Error('no pageFileName');
        // if (!params.form)         throw new Error('no form');
        if (!params.name)         throw new Error('no name');
        const appEditor = await this.createApplicationEditor();
        let data;
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createFormEditor(params.form);
                data = await formEditor.newActionData(params);
            } else {
                data = await pageEditor.newActionData(params);
            }
            await pageEditor.save();
        } else {
            data = await appEditor.newActionData(params);
            await appEditor.save();
        }
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
