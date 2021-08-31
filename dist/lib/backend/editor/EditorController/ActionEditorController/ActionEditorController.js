"use strict";
const EditorController = require('../EditorController');
class ActionEditorController extends EditorController {
    async _new(params) {
        console.log('ActionEditorController._new');
        const appEditor = await this.createApplicationEditor();
        let data;
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createFormEditor(params.form);
                data = await formEditor.newActionData(params);
            }
            else {
                data = await pageEditor.newActionData(params);
            }
            await pageEditor.save();
        }
        else {
            data = await appEditor.newActionData(params);
            await appEditor.save();
        }
        return data;
    }
    async save(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createFormEditor(params.form);
                const actionEditor = formEditor.createActionEditor(params.action);
                await actionEditor.setAttr(params.attr, params.value);
            }
            else {
                const actionEditor = pageEditor.createActionEditor(params.action);
                await actionEditor.setAttr(params.attr, params.value);
            }
            await pageEditor.save();
        }
        else {
            const actionEditor = appEditor.createActionEditor(params.action);
            await actionEditor.setAttr(params.attr, params.value);
            await appEditor.save();
        }
        return null;
    }
    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        let data;
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createFormEditor(params.form);
                data = formEditor.removeColData('actions', params.action);
            }
            else {
                data = pageEditor.removeColData('actions', params.action);
            }
            await pageEditor.save();
        }
        else {
            data = appEditor.removeColData('actions', params.action);
            await appEditor.save();
        }
        return data;
    }
    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createFormEditor(params.form);
                formEditor.moveActionUp(params.action);
                await pageEditor.save();
            }
            else {
                pageEditor.moveActionUp(params.action);
                await pageEditor.save();
            }
        }
        else {
            appEditor.moveActionUp(params.action);
            await appEditor.save();
        }
        return null;
    }
    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createFormEditor(params.form);
                formEditor.moveActionDown(params.action);
                await pageEditor.save();
            }
            else {
                pageEditor.moveActionDown(params.action);
                await pageEditor.save();
            }
        }
        else {
            appEditor.moveActionDown(params.action);
            await appEditor.save();
        }
        return null;
    }
}
module.exports = ActionEditorController;
