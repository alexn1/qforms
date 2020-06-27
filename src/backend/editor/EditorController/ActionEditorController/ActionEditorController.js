'use strict';

const path = require('path');
const EditorController = require('../EditorController');

class ActionEditorController extends EditorController {
    constructor(...args) {
        super(...args);
        this.viewDirPath = path.join(this.hostApp.publicDirPath, 'editor/class/Controller/ModelController/ActionController');
    }

    async _new(params) {
        console.log('ActionEditorController._new');
        if (!params.pageFileName) throw new Error('no pageFileName');
        if (!params.form) throw new Error('no form');
        if (!params.name) throw new Error('no name');
        // if (!params.caption) throw new Error('no caption');
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const actionData = await formEditor.createAction(params);
        return actionData;
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const actionEditor = formEditor.createActionEditor(params.action);
        await actionEditor.setAttr(params.attr, params.value);
        return null;
    }
}
module.exports = ActionEditorController;
