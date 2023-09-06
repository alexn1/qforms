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

export interface BaseDto {
    action: 'page' | 'insert' | 'select' | 'update' | '_delete' | 'rpc' | 'login' | 'logout';
}

export interface LoginDTO extends BaseDto {
    tzOffset: JSONString;
    username: string;
    password: string;
}

export interface PageActionDTO extends BaseDto {
    page: string;
}

export interface SelectActionDto extends BaseDto {
    page: string;
    form: string;
    ds: string;
}

export interface InsertActionDto extends BaseDto {
    page: string;
    form: string;
}

export interface UpdateActionDto extends BaseDto {
    page: string;
    form: string;
}

export interface DeleteActionDto extends BaseDto {
    page: string;
    form: string;
}

export interface RpcActionDto extends BaseDto {
    page: string;
    form: string;
    name: string;
}

export interface RequestBody extends BaseDto {
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

export interface Link {
    href: string;
    rel: string;
}

export interface Access {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}
