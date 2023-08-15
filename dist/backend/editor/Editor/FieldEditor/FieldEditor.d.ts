import { Editor } from '../Editor';
import { FieldAttributes, FieldScheme } from '../../../common/Scheme/FieldScheme/FieldScheme';
export type FieldParams = Partial<FieldAttributes> & {
    name: string;
};
export declare class FieldEditor<T extends FieldScheme = FieldScheme> extends Editor<T> {
    static createAttributes(params: FieldParams): FieldAttributes;
    changeClass(newClassName: string): any;
    createJs(params: any): Promise<any>;
    createJsx(params: any): Promise<any>;
    createLess(params: any): Promise<any>;
    getCollectionDirPath(): Promise<string>;
    getColName(): string;
}
