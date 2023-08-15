import {
    RadioFieldAttributes,
    RadioFieldScheme,
} from '../../../../common/Scheme/FieldScheme/RadioFieldScheme';
import { FieldEditor } from '../FieldEditor';

export type RadioFieldParams = Partial<RadioFieldAttributes> & { name: string };

export class RadioFieldEditor extends FieldEditor<RadioFieldScheme> {
    static createData(params: RadioFieldParams): RadioFieldScheme {
        return {
            '@class': 'RadioField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
                // placeholder   : params.placeholder    ? params.placeholder    :             '',
                dataSourceName: params.dataSourceName ? params.dataSourceName : '',
                valueColumn: params.valueColumn ? params.valueColumn : '',
                displayColumn: params.displayColumn ? params.displayColumn : '',
            },
        };
    }
}
