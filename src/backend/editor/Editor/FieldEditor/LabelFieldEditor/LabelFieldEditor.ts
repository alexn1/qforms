import {
    LabelFieldAttributes,
    LabelFieldSchema,
} from '../../../../common/Scheme/FieldScheme/LabelFieldScheme';
import { FieldEditor } from '../FieldEditor';

export type LabelFieldParams = Partial<LabelFieldAttributes> & {
    name: string;
};

export class LabelFieldEditor extends FieldEditor<LabelFieldSchema> {
    static createData(params: LabelFieldParams): LabelFieldSchema {
        return {
            '@class': 'LabelField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
            },
        };
    }
}
