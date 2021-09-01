const EditorController = require('../EditorController');

class ParamEditorController extends EditorController {
    /*constructor(...args) {
        console.log('ParamEditorController.constructor');
        super(...args);
    }*/
    async _new(params) {
        console.log('ParamEditorController._new');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const data = databaseEditor.newItemData('Param', 'params', params);
        await appEditor.save();
        return data;
    }
    async save(params) {
        console.log('ParamEditorController.save');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const paramEditor = databaseEditor.createItemEditor('params', params.param);
        paramEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }
    async delete(params) {
        console.log('ParamEditorController.delete');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const data = databaseEditor.removeColData('params', params.param);
        await appEditor.save();
        return data;
    }

}

export = ParamEditorController;
