import { DatabaseEditor, DatabaseParams } from '../DatabaseEditor';
import { DatabaseScheme } from '../../../../common/Scheme/DatabaseScheme';
export declare class PostgreSqlDatabaseEditor extends DatabaseEditor {
    static createData(params: DatabaseParams): DatabaseScheme;
}
