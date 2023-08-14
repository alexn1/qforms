import { DatabaseAttributes, DatabaseItems, DatabaseScheme } from '../../../common/Scheme/DatabaseScheme';
import { Editor } from '../Editor';
export type DatabaseParams = Partial<DatabaseAttributes> & Partial<DatabaseItems> & {
    name: string;
};
export declare class DatabaseEditor extends Editor<DatabaseScheme> {
    static createData(params: DatabaseParams): DatabaseScheme;
    static createAttributes(params: DatabaseParams): DatabaseAttributes;
    getColName(): string;
}
