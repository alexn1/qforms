// JSONString
export type JSONString = string & { type: 'JSONString' };

// Key - json string of key array
// '[123]'
// '["abc"]'
// '[123, "abc"]'
export type Key = JSONString & { type2: 'Key' };

export type KeyItem = number | string | boolean;

export type KeyArray = KeyItem[];

export interface KeyObject {
    [column: string]: KeyItem;
}

export const keyArrayToKey = (keyArray: KeyArray): Key => {
    return JSON.stringify(keyArray) as Key;
};

export const keyToKeyArray = (key: Key): KeyArray => {
    return JSON.parse(key);
};

interface _Row {
    [column: string]: any;
}

export type Row = _Row & { type: 'Row' };

interface _RawRow {
    [column: string]: JSONString;
}

export type RawRow = _RawRow & { type: 'RawRow' };

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

export interface LogRecord {
    id: number;
    created: Date;
    location: 'client' | 'server';
    level: 'info' | 'warn' | 'error';
    type: string;
    message: string;
    stack: string;
    data: string;
}
