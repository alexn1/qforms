import { DataSource } from '../DataSource';
import { Key, RawRow } from '../../../../../types';
import { Result } from '../../../../../Result';
export declare class PersistentDataSource extends DataSource {
    insert(row: RawRow): Promise<Result>;
    update(): Promise<Result | null>;
    delete(key: Key): Promise<Result>;
    onTableUpdate: (e: any) => Promise<void>;
    onTableInsert: (e: any) => Promise<void>;
    onTableDelete: (e: any) => Promise<void>;
    onTableRefresh: (e: any) => Promise<void>;
    getPageParams(): {
        [x: string]: any;
    };
    refresh(): Promise<void>;
    refill(): Promise<void>;
    fill(frame: any): Promise<void>;
    more(): Promise<void>;
    select(params?: {}): Promise<any>;
    isPersistent(): boolean;
}
