import { DatabaseEditor, DatabaseParams } from '../DatabaseEditor';
import { DatabaseScheme } from '../../../../common/Scheme/DatabaseScheme';
export declare class MySqlDatabaseEditor extends DatabaseEditor {
    static createData(params: DatabaseParams): DatabaseScheme;
}
