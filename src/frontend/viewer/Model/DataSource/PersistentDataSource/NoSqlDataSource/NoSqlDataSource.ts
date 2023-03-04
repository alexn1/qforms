import { PersistentDataSource } from '../PersistentDataSource';

export class NoSqlDataSource extends PersistentDataSource {}

if (typeof window === 'object') {
    // @ts-ignore
    window.NoSqlDataSource = NoSqlDataSource;
}
