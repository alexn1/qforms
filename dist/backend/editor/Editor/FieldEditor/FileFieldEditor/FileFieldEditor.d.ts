import { FileFieldAttributes, FileFieldScheme } from '../../../../common/Scheme/FieldScheme/FileFieldScheme';
import { FieldEditor } from '../FieldEditor';
export type FileFieldParams = Partial<FileFieldAttributes> & {
    name: string;
};
export declare class FileFieldEditor extends FieldEditor<FileFieldScheme> {
    static createData(params: FileFieldParams): FileFieldScheme;
}
