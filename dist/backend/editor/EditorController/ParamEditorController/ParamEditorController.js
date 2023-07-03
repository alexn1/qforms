"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamEditorController = void 0;
const EditorController_1 = require("../EditorController");
class ParamEditorController extends EditorController_1.EditorController {
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
exports.ParamEditorController = ParamEditorController;
