import {
    DateFieldAttributes,
    DateFieldSchema,
} from '../../../../common/Scheme/FieldScheme/DateFieldScheme';
import { FieldEditor } from '../FieldEditor';

export type DateFieldParam = Partial<DateFieldAttributes> & { name: string };

export class DateFieldEditor extends FieldEditor<DateFieldSchema> {
    static createData(params: DateFieldParam): DateFieldSchema {
        return {
            '@class': 'DateField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
                format: params.format ? params.format : '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}',
                timezone: params.timezone ? params.timezone : 'true',
                placeholder: params.placeholder ? params.placeholder : '',
                validateOnChange: params.validateOnChange ? params.validateOnChange : 'true',
                validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false',
            },
        };
    }
}
