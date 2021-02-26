const path = require('path');
const _    = require('underscore');
const EditorController = require('../EditorController');

class ParamEditorController extends EditorController {

    constructor(...args) {
        console.log('ParamEditorController.constructor');
        super(...args);
        this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/ParamController'
        );
    }

    async _new(params) {
        console.log('ParamEditorController._new');
        const appEditor = await this.createApplicationEditor();
        const param = appEditor.createDatabaseEditor(params.database).newParamData(params);
        await appEditor.save();
        return param;
    }

    async save(params) {
        console.log('ParamEditorController.save');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createDatabaseEditor(params.database);
        const paramEditor = databaseEditor.getParamEditor(params.param);
        await paramEditor.setAttr(params.attr, params.value);
        return null;
    }

    async delete(params) {
        console.log('ParamEditorController.delete');
        const appEditor = await this.createApplicationEditor();
        appEditor.createDatabaseEditor(params.database).deleteParam(params.param)
        await appEditor.save();
        return null;
    }

}

module.exports = ParamEditorController;
