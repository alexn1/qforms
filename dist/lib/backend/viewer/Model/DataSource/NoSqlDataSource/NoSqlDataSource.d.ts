import { DataSource } from '../DataSource';
import { Context } from '../../../../Context';
export declare class NoSqlDataSource extends DataSource {
    fill(context: Context): Promise<any>;
    select(context: Context): Promise<[any[], number | null]>;
}
