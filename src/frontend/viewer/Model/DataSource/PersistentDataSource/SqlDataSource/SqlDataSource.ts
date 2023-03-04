import { PersistentDataSource } from '../PersistentDataSource';

export class SqlDataSource extends PersistentDataSource {}

if (typeof window === 'object') {
    // @ts-ignore
    window.SqlDataSource = SqlDataSource;
}
