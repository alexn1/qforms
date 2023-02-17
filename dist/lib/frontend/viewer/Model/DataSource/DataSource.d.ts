import { Model } from '../Model';
import { Form } from '../Form/Form';
export declare class DataSource extends Model {
    rows: any;
    rowsByKey: any;
    news: any[];
    changes: any;
    frame: number;
    count: number;
    lastFrame: number;
    constructor(data: any, parent: any);
    init(): void;
    deinit(): void;
    setRows(rows: any): void;
    addRow(row: any): void;
    addRows(rows: any): void;
    getRowsLength(): any;
    fillRowsByKey(): void;
    discardRowColumn(row: any, column: any): void;
    changeRowColumn(row: any, column: any, newValue: any): void;
    setValue(row: any, column: any, value: any): void;
    isChanged(): boolean;
    hasNew(): boolean;
    isRowColumnChanged(row: any, column: any): boolean;
    getValue(row: any, column: any): any;
    getKeyValues(row: any): any;
    getRowKey(row: any): string;
    removeRow(key: any): void;
    newRow(row: any): void;
    getSingleRow(withChanges?: boolean): any;
    getForm(): Form;
    getPage(): any;
    getApp(): any;
    getRow(key: any): any;
    getRows(): any;
    getRowByIndex(i: any): any;
    discard(): void;
    static keyToParams(key: string, paramName?: string): any;
    getChangesByKey(): {};
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
