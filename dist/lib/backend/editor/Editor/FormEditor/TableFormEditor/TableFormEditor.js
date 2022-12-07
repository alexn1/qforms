"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormEditor = void 0;
const FormEditor_1 = require("../FormEditor");
const Editor_1 = require("../../Editor");
class TableFormEditor extends FormEditor_1.FormEditor {
    static createData(params) {
        // console.log('TableFormEditor.createData', params);
        return {
            '@class': 'TableForm',
            '@attributes': Object.assign(Object.assign({}, FormEditor_1.FormEditor.createAttributes(params)), { editMethod: params.editMethod || 'disabled', itemEditPage: params.itemEditPage || '', itemCreatePage: params.itemCreatePage || '', newRowMode: params.newRowMode || 'disabled', deleteRowMode: params.deleteRowMode || 'disabled', refreshButton: params.refreshButton || 'false' }),
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor_1.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(Editor_1.Editor.createItemData) : [])],
            fields: [...(params.fields ? params.fields.map(Editor_1.Editor.createItemData) : [])],
        };
    }
}
exports.TableFormEditor = TableFormEditor;
