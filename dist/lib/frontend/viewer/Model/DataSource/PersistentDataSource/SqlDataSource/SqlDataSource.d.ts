import { PersistentDataSource } from '../PersistentDataSource';
export declare class SqlDataSource extends PersistentDataSource {
    insert(row: any): Promise<any>;
    update(): Promise<any>;
    delete(key: any): Promise<any>;
    onTableUpdate: (e: any) => Promise<void>;
    onTableInsert: (e: any) => Promise<void>;
    onTableDelete: (e: any) => Promise<void>;
    onTableRefresh: (e: any) => Promise<void>;
    getPageParams(): any;
    refresh(): Promise<void>;
    refill(): Promise<void>;
    fill(frame: any): Promise<void>;
    more(): Promise<void>;
    select(params?: {}): Promise<any>;
    isPersistent(): boolean;
}
