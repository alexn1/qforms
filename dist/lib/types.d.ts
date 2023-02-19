export type JSONString = string & {
    type: 'JSONString';
};
export type Key = JSONString & {
    type2: 'Key';
};
export type KeyValue = number | string;
export type KeyArray = KeyValue[];
interface _Row {
    [column: string]: any;
}
export type Row = _Row & {
    type: 'Row';
};
interface _RawRow {
    [column: string]: JSONString;
}
export type RawRow = _RawRow & {
    type: 'RawRow';
};
export interface ChangesByKey {
    [key: Key]: RawRow;
}
export interface KeyParams {
    [param: string]: KeyValue;
}
export interface KeyValues {
    [column: string]: KeyValue;
}
export interface QueryParams {
    [name: string]: string | number | boolean;
}
export declare const keyArrayToKey: (keyArray: KeyArray) => Key;
export {};
