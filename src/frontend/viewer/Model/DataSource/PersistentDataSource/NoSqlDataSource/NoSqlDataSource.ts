import { PersistentDataSource } from '../PersistentDataSource';

export class NoSqlDataSource extends PersistentDataSource {
    isPersistent() {
        return true;
    }
}

// @ts-ignore
window.NoSqlDataSource = NoSqlDataSource;
