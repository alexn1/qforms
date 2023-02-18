// JSONString
export type JSONString = string & { type: 'JSONString' };

// Key - array of values as json string
// '[123]'
// '["abc"]'
// '[123, "abc"]'
export type Key = JSONString & { type2: 'Key' };

export type KeyValue = number | string;

export type KeyArray = KeyValue[];

export interface Row {
    [column: string]: any;
}

export interface RawRow {
    [column: string]: JSONString;
}

export interface ChangesByKey {
    [key: Key]: RawRow;
}

export interface KeyParams {
    [param: string]: KeyValue;
}

export interface KeyValues {
    [column: string]: KeyValue;
}
