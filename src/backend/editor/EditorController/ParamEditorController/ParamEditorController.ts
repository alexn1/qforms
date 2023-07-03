import { EditorController } from '../EditorController';

export class ParamEditorController extends EditorController {
    /*constructor(...args) {
        console.debug('ParamEditorController.constructor');
        super(...args);
    }*/

    async _new(params) {
        console.debug('ParamEditorController._new');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const data = databaseEditor.newItemData('Param', 'params', params);
        await appEditor.save();
        return data;
    }

    async save(params) {
        console.debug('ParamEditorController.save');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const paramEditor = databaseEditor.createItemEditor('params', params.param);
        paramEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }

    async delete(params) {
        console.debug('ParamEditorController.delete');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const data = databaseEditor.removeColData('params', params.param);
        await appEditor.save();
        return data;
    }
}
