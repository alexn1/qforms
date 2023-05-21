export type JSONString = string & {
    type: 'JSONString';
};
export type Key = JSONString & {
    type2: 'Key';
};
export type KeyItem = number | string | boolean;
export type KeyArray = KeyItem[];
export interface KeyObject {
    [column: string]: KeyItem;
}
export declare const keyArrayToKey: (keyArray: KeyArray) => Key;
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
export interface QueryParams {
    [name: string]: string | number | boolean | null;
}
export type Align = 'left' | 'center' | 'right';
export type Visibility = 'visible' | 'hidden';
export interface Params {
    [name: string]: any;
}
export {};