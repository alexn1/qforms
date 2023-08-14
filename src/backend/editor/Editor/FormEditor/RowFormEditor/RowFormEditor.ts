import { FormEditor } from '../FormEditor';
import { Editor } from '../../Editor';
import { FormItems, RowFormAttributes, RowFormScheme } from '../../../../common/Scheme/FormScheme';

export type RowFormParams = Partial<RowFormAttributes> &
    Partial<FormItems> & {
        name: string;
    };

export class RowFormEditor extends FormEditor<RowFormScheme> {
    static createData(params: RowFormParams): RowFormScheme {
        // debug('RowFormEditor.createData', params);
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
