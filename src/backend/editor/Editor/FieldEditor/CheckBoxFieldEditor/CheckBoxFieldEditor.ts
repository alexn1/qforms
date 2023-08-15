import { FieldEditor } from '../FieldEditor';
import {
    CheckBoxFieldAttributes,
    CheckBoxFieldScheme,
} from '../../../../common/Scheme/FieldScheme/CheckBoxFieldScheme';

export type CheckBoxFieldParams = Partial<CheckBoxFieldAttributes> & {
    name: string;
};

export class CheckBoxFieldEditor extends FieldEditor<CheckBoxFieldScheme> {
    static createData(params: CheckBoxFieldParams): CheckBoxFieldScheme {
        return {
            '@class': 'CheckBoxField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
            },
        };
    }
}
