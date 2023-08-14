import { Editor } from '../Editor';
import { FormAttributes, FormScheme, FormItems } from '../../../common/Scheme/FormScheme';
export type FormParams = Partial<FormAttributes> & Partial<FormItems> & {
    name: string;
};
export declare class FormEditor<T extends FormScheme = FormScheme> extends Editor<T> {
    static createAttributes(params: FormParams): FormAttributes;
    static createData(params: FormParams): FormScheme;
    createJs(params: any): Promise<any>;
    createJsx(params: any): Promise<any>;
    createLess(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCollectionDirPath(): Promise<string>;
    getColName(): string;
}
