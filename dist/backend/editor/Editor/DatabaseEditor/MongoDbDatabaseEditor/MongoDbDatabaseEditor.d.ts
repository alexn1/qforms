import { DatabaseEditor } from '../DatabaseEditor';
import { DatabaseScheme } from '../../../../common/Scheme/DatabaseScheme';
import { DatabaseParams } from '../DatabaseEditor';
export declare class MongoDbDatabaseEditor extends DatabaseEditor {
    static createData(params: DatabaseParams): DatabaseScheme;
}
