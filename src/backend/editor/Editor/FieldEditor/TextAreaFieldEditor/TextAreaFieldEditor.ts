import {
    TextAreaFieldAttributes,
    TextAreaFieldScheme,
} from '../../../../common/Scheme/FieldScheme/TextAreaFieldScheme';
import { FieldEditor } from '../FieldEditor';

export type TextAreaFieldParams = Partial<TextAreaFieldAttributes> & { name: string };

export class TextAreaFieldEditor extends FieldEditor<TextAreaFieldScheme> {
    static createData(params: TextAreaFieldParams): TextAreaFieldScheme {
        return {
            '@class': 'TextAreaField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
                rows: params.rows ? params.rows : '',
                cols: params.cols ? params.cols : '',
                validateOnChange: params.validateOnChange ? params.validateOnChange : 'true',
                validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false',
            },
        };
    }
}
