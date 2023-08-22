export type Scalar = string | number | boolean;

export type JSONString = string & { type: 'JSONString' };

export type Key = JSONString & { type2: 'Key' };

export type KeyElement = Scalar;

export type KeyTuple = KeyElement[];

export type KeyRecord = {
    [column: string]: KeyElement;
};

export type Row = {
    [column: string]: any;
} & { type: 'Row' };

export type RawRow = {
    [column: string]: JSONString;
} & { type: 'RawRow' };

export type ChangesByKey = {
    [key: Key]: RawRow;
};

export type Align = 'left' | 'center' | 'right';

export type Visibility = 'visible' | 'hidden';

export type Display = 'block' | 'none';

export const keyTupleToKey = (keyArray: KeyTuple): Key => {
    return JSON.stringify(keyArray) as Key;
};

export const keyToKeyTuple = (key: Key): KeyTuple => {
    return JSON.parse(key);
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export interface RequestBody {
    action: 'page' | 'insert' | 'select' | 'update' | '_delete' | 'rpc' | 'login' | 'logout';
    page?: Nullable<string>;
    form?: Nullable<string>;
    ds?: string;
    name?: string;
    uuid?: string;
    changes?: ChangesByKey;
    params?: Record<string, any>;
    row?: RawRow;
    newMode?: boolean;
}
