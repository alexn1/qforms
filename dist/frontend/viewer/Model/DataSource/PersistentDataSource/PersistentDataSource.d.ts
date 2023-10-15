import { DataSource } from '../DataSource';
import { Key, RawRow, Scalar, Nullable } from '../../../../../types';
import { Result } from '../../../../../Result';
import { ReadActionResponse } from '../../../../common';
export declare class PersistentDataSource extends DataSource {
    insert(row: RawRow): Promise<Result>;
    update(): Promise<Result | null>;
    delete(key: Key): Promise<Result>;
    onTableUpdate: (e: any) => Promise<void>;
    onTableInsert: (e: any) => Promise<void>;
    onTableDelete: (e: any) => Promise<void>;
    onTableRefresh: (e: any) => Promise<void>;
    getPageParams(): Record<string, Nullable<Scalar>>;
    refresh(): Promise<void>;
    refill(): Promise<void>;
    fill(frame: number): Promise<void>;
    more(): Promise<void>;
    select(params?: Record<string, Nullable<Scalar>>): Promise<ReadActionResponse>;
    isPersistent(): boolean;
}
