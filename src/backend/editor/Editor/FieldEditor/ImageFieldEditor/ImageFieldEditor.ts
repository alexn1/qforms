import {
    ImageFieldAttributes,
    ImageFieldSchema,
} from '../../../../common/Scheme/FieldScheme/ImageFieldSchema';
import { FieldEditor } from '../FieldEditor';

export type ImageFieldParams = Partial<ImageFieldAttributes> & {
    name: string;
};

export class ImageFieldEditor extends FieldEditor<ImageFieldSchema> {
    static createData(params: ImageFieldParams): ImageFieldSchema {
        return {
            '@class': 'ImageField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
            },
        };
    }
}
