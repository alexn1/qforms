import { PersistentDataSource } from '../PersistentDataSource';
import { Helper } from '../../../../../../common/Helper';

export class SqlDataSource extends PersistentDataSource {}

Helper.registerGlobalClass(SqlDataSource);
