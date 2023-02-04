import { DataSource } from '../DataSource';

export class NoSqlDataSource extends DataSource {
    isPersistent() {
        return true;
    }
}

// @ts-ignore
window.NoSqlDataSource = NoSqlDataSource;
