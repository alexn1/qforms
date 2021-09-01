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
                const formEditor = pageEditor.createItemEditor('forms', params.form);
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
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                const actionEditor = formEditor.createItemEditor('actions', params.action);
                actionEditor.setAttr(params.attr, params.value);
            }
            else {
                const actionEditor = pageEditor.createItemEditor('actions', params.action);
                actionEditor.setAttr(params.attr, params.value);
            }
            await pageEditor.save();
        }
        else {
            const actionEditor = appEditor.createItemEditor('actions', params.action);
            actionEditor.setAttr(params.attr, params.value);
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
                const formEditor = pageEditor.createItemEditor('forms', params.form);
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
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                formEditor.moveItemUp('actions', params.action);
                await pageEditor.save();
            }
            else {
                pageEditor.moveItemUp('actions', params.action);
                await pageEditor.save();
            }
        }
        else {
            appEditor.moveItemUp('actions', params.action);
            await appEditor.save();
        }
        return null;
    }
    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                formEditor.moveItemDown('actions', params.action);
                await pageEditor.save();
            }
            else {
                pageEditor.moveItemDown('actions', params.action);
                await pageEditor.save();
            }
        }
        else {
            appEditor.moveItemDown('actions', params.action);
            await appEditor.save();
        }
        return null;
    }
}
module.exports = ActionEditorController;
