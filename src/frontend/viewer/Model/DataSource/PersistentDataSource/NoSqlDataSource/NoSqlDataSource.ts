import { PersistentDataSource } from '../PersistentDataSource';

export class NoSqlDataSource extends PersistentDataSource {}

// @ts-ignore
window.NoSqlDataSource = NoSqlDataSource;
