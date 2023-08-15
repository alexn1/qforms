import { FieldEditor } from '../FieldEditor';
import {
    ComboBoxFieldAttributes,
    ComboBoxFieldScheme,
} from '../../../../common/Scheme/FieldScheme/ComboBoxFieldScheme';

export type ComboBoxFieldParams = Partial<ComboBoxFieldAttributes> & {
    name: string;
};

export class ComboBoxFieldEditor extends FieldEditor<ComboBoxFieldScheme> {
    static createData(params: ComboBoxFieldParams): ComboBoxFieldScheme {
        return {
            '@class': 'ComboBoxField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
                placeholder: params.placeholder ? params.placeholder : '',
                dataSourceName: params.dataSourceName ? params.dataSourceName : '',
                valueColumn: params.valueColumn ? params.valueColumn : '',
                displayColumn: params.displayColumn ? params.displayColumn : '',
                newRowMode: params.newRowMode ? params.newRowMode : 'disabled',
                itemEditPage: params.itemEditPage ? params.itemEditPage : '',
                itemCreatePage: params.itemCreatePage ? params.itemCreatePage : '',
                itemCreateForm: params.itemCreateForm ? params.itemCreateForm : '',
                itemSelectPage: params.itemSelectPage ? params.itemSelectPage : '',
            },
        };
    }
}
