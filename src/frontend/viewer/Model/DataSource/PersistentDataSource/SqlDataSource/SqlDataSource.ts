import { PersistentDataSource } from '../PersistentDataSource';

export class SqlDataSource extends PersistentDataSource {}

// @ts-ignore
window.SqlDataSource = SqlDataSource;
