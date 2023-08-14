import { FormEditor } from '../FormEditor';
import { Editor } from '../../Editor';
import {
    FormItems,
    TableFormAttributes,
    TableFormScheme,
} from '../../../../common/Scheme/FormScheme';

export type TableFormParams = Partial<TableFormAttributes> &
    Partial<FormItems> & {
        name: string;
    };

export class TableFormEditor extends FormEditor<TableFormScheme> {
    static createData(params: TableFormParams): TableFormScheme {
        // debug('TableFormEditor.createData', params);
        return {
            '@class': 'TableForm',
            '@attributes': {
                ...FormEditor.createAttributes(params),
                editMethod: params.editMethod || 'disabled',
                itemEditPage: params.itemEditPage || '',
                itemCreatePage: params.itemCreatePage || '',
                newRowMode: params.newRowMode || 'disabled',
                deleteRowMode: params.deleteRowMode || 'disabled',
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
