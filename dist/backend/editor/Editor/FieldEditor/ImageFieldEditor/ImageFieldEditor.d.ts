import { ImageFieldAttributes, ImageFieldSchema } from '../../../../common/Scheme/FieldScheme/ImageFieldSchema';
import { FieldEditor } from '../FieldEditor';
export type ImageFieldParams = Partial<ImageFieldAttributes> & {
    name: string;
};
export declare class ImageFieldEditor extends FieldEditor<ImageFieldSchema> {
    static createData(params: ImageFieldParams): ImageFieldSchema;
}
