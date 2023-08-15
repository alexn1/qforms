import { FieldEditor } from '../FieldEditor';
import {
    CheckBoxFieldScheme,
    CheckBoxListFieldAttributes,
} from '../../../../common/Scheme/FieldScheme/CheckBoxListField';

export type CheckBoxListFieldParams = Partial<CheckBoxListFieldAttributes> & { name: string };

export class CheckBoxListFieldEditor extends FieldEditor<CheckBoxFieldScheme> {
    static createData(params: CheckBoxListFieldParams): CheckBoxFieldScheme {
        return {
            '@class': 'CheckBoxListField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
                dataSourceName: params.dataSourceName ? params.dataSourceName : '',
                valueColumn: params.valueColumn ? params.valueColumn : '',
                displayColumn: params.displayColumn ? params.displayColumn : '',
            },
        };
    }
}
