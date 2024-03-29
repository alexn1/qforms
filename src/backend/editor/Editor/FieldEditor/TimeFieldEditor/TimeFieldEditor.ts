import {
    TimeFieldAttributes,
    TimeFieldScheme,
} from '../../../../common/Scheme/FieldScheme/TimeFieldScheme';
import { FieldEditor } from '../FieldEditor';

export type TimeFieldParams = Partial<TimeFieldAttributes> & { name: string };

export class TimeFieldEditor extends FieldEditor<TimeFieldScheme> {
    static createData(params: TimeFieldParams): TimeFieldScheme {
        return {
            '@class': 'TimeField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
                placeholder: params.placeholder ? params.placeholder : '',
                validateOnChange: params.validateOnChange ? params.validateOnChange : 'true',
                validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false',
            },
        };
    }
}
