import { Model } from '../Model';
import { Form } from '../Form/Form';
import { Page } from '../Page/Page';
import { Application } from '../Application/Application';
import { Key, KeyParams, KeyValues, Row } from '../../../../types';
export declare class DataSource extends Model {
    rows: Row[];
    rowsByKey: {
        [key: Key]: Row;
    };
    news: any[];
    changes: Map<Row, any>;
    frame: number;
    count: number;
    lastFrame: number;
    constructor(data: any, parent: any);
    init(): void;
    deinit(): void;
    setRows(rows: Row[]): void;
    addRow(row: Row): void;
    addRows(rows: Row[]): void;
    getRowsLength(): number;
    fillRowsByKey(): void;
    discardRowColumn(row: Row, column: string): void;
    changeRowColumn(row: Row, column: string, newValue: any): void;
    setValue(row: Row, column: string, value: any): void;
    isChanged(): boolean;
    hasNew(): boolean;
    isRowColumnChanged(row: Row, column: string): boolean;
    getValue(row: Row, column: string): any;
    getKeyValues(row: Row): KeyValues;
    getRowKey(row: Row): Key;
    removeRow(key: Key): void;
    newRow(row: Row): void;
    getSingleRow(withChanges?: boolean): any;
    getForm(): Form | null;
    getPage(): Page | null;
    getApp(): Application | null;
    getRow(key: Key): Row;
    getRows(): Row[];
    getRowByIndex(i: number): Row;
    discard(): void;
    static keyToParams(key: string, paramName?: string): KeyParams;
    getChangesByKey(): {
        [key: Key]: any;
    };
    getRowWithChanges(row: any): any;
    hasNewRows(): boolean;
    static copyNewValues(row: any, newValues: any): void;
    updateRow(key: any, newValues: any): void;
    getTable(): any;
    getDatabase(): any;
    getType(columnName: any): any;
    insert(row?: any): Promise<any>;
    delete(key: any): Promise<{
        [x: number]: {
            [x: number]: {
                delete: any[];
            };
        };
    }>;
    update(): Promise<{
        [x: number]: {
            [x: number]: {
                update: {};
            };
        };
    }>;
    onTableInsert: (e: any) => Promise<void>;
    onTableUpdate: (e: any) => Promise<void>;
    onTableDelete: (e: any) => Promise<void>;
    onTableRefresh: (e: any) => Promise<any>;
    isSurrogate(): any;
    moveRow(row: any, offset: any): void;
    getLimit(): number | null;
    getCount(): number;
    getFrame(): number;
    getLastFrame(): number;
    setFrame(frame: any): void;
    getFramesCount(): number;
    hasMore(): boolean;
    isPersistent(): boolean;
    refresh(): Promise<void>;
}
