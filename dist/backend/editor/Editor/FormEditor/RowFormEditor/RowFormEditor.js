"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormEditor = void 0;
const FormEditor_1 = require("../FormEditor");
const Editor_1 = require("../../Editor");
class RowFormEditor extends FormEditor_1.FormEditor {
    static createData(params) {
        // console.debug('RowFormEditor.createData', params);
        return {
            '@class': 'RowForm',
            '@attributes': Object.assign(Object.assign({}, FormEditor_1.FormEditor.createAttributes(params)), { newMode: params.newMode ? params.newMode : '', backOnly: params.backOnly ? params.backOnly : 'false', refreshButton: params.refreshButton || 'true' }),
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor_1.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(Editor_1.Editor.createItemData) : [])],
            fields: [...(params.fields ? params.fields.map(Editor_1.Editor.createItemData) : [])],
        };
    }
}
exports.RowFormEditor = RowFormEditor;
