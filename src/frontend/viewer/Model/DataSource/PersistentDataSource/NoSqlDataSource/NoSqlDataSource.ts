import { PersistentDataSource } from '../PersistentDataSource';
import { Helper } from '../../../../../../common/Helper';

export class NoSqlDataSource extends PersistentDataSource {}

Helper.registerGlobalClass(NoSqlDataSource);
