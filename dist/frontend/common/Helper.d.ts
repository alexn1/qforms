import { JSONString, Query, QueryRecord, KeyTuple, Key } from '../../types';
export declare class Helper {
    static encodeObject(obj: Record<string, any>): Record<string, JSONString>;
    static encodeValue<T>(value: T): JSONString<T>;
    static decodeObject(eObj: Record<string, JSONString>): Record<string, any>;
    static decodeValue(raw: JSONString): any;
    static dateTimeReviver(key: string, value: any): any;
    static moveArrItem(arr: any[], item: any, offset: number): void;
    static fillArray(n: number): number[];
    static sleep(ms: number): Promise<unknown>;
    static registerGlobalClass(Class: any): void;
    static getGlobalClass(className: string): any;
    static addClassToDocumentElement(className: string): void;
    static headersToRecord(headers: Headers): Record<string, string>;
    static queryToString(query: Query): string;
    static queryRecordToString(name: string, record: QueryRecord): string;
    static keyTupleToKey(keyArray: KeyTuple): Key;
    static keyToKeyTuple(key: Key): KeyTuple;
    static getFirstField(object: any): any;
    static mapObject(object: any, cb: any): any;
    static templateArray(arr: any[]): any[];
    static templateToJsString(value: string, params: Record<string, any>): string;
}
