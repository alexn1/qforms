import {
    DateTimeFieldAttributes,
    DateTimeFieldScheme,
} from '../../../../common/Scheme/FieldScheme/DateTimeFieldScheme';
import { FieldEditor } from '../FieldEditor';

export type DateTimeFieldParams = Partial<DateTimeFieldAttributes> & {
    name: string;
};

export class DateTimeFieldEditor extends FieldEditor<DateTimeFieldScheme> {
    static createData(params: DateTimeFieldParams): DateTimeFieldScheme {
        return {
            '@class': 'DateTimeField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
                format: params.format ? params.format : '{DD}.{MM}.{YYYY}',
                timezone: params.timezone ? params.timezone : 'true',
                placeholder: params.placeholder ? params.placeholder : '',
                validateOnChange: params.validateOnChange ? params.validateOnChange : 'true',
                validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false',
            },
        };
    }
}
