// JSONString
export type JSONString = string & { __type: 'JSONString' };

// Key - tupple of values as json string
// '[1]'
// '["abc", 1, "xyz"]'
export type Key = JSONString & { __type2: 'Key' };

export type KeyValue = number | string;

export interface KeyValues {
    [name: string]: KeyValue;
}

export interface Row {
    [name: string]: any;
}
