import { FormEditor } from '../FormEditor';
import { Editor } from '../../Editor';

export class RowFormEditor extends FormEditor {
    static createData(params) {
        // console.debug('RowFormEditor.createData', params);
        return {
            '@class': 'RowForm',
            '@attributes': {
                ...FormEditor.createAttributes(params),
                newMode: params.newMode ? params.newMode : '',
                backOnly: params.backOnly ? params.backOnly : 'false',
                refreshButton: params.refreshButton || 'true',
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(Editor.createItemData) : [])],
            fields: [...(params.fields ? params.fields.map(Editor.createItemData) : [])],
        };
    }
}
