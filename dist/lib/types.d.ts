export type JSONString = string & {
    type: 'JSONString';
};
export type Key = JSONString & {
    type2: 'Key';
};
export type KeyValue = number | string;
export type KeyArray = KeyValue[];
export interface KeyValues {
    [name: string]: KeyValue;
}
export interface Row {
    [name: string]: any;
}
export interface RawRow {
    [name: string]: JSONString;
}
export interface Changes {
    [key: Key]: RawRow;
}
export interface KeyParams {
    [name: string]: KeyValue;
}
