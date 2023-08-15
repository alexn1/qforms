import {
    FileFieldAttributes,
    FileFieldScheme,
} from '../../../../common/Scheme/FieldScheme/FileFieldScheme';
import { FieldEditor } from '../FieldEditor';

export type FileFieldParams = Partial<FileFieldAttributes> & {
    name: string;
};

export class FileFieldEditor extends FieldEditor<FileFieldScheme> {
    static createData(params: FileFieldParams): FileFieldScheme {
        return {
            '@class': 'FileField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
            },
        };
    }
}
