import { ParsedQs } from 'qs';
export type Scalar = string | number | boolean;
export type JSONString<T = any> = string & {
    type: 'JSONString';
};
export type Key = JSONString & {
    type2: 'Key';
};
export type KeyElement = Scalar;
export type KeyTuple = KeyElement[];
export type KeyRecord = {
    [column: string]: KeyElement;
};
export type Row = {
    [column: string]: any;
} & {
    type: 'Row';
};
export type RawRow = {
    [column: string]: JSONString;
} & {
    type: 'RawRow';
};
export type ChangesByKey = {
    [key: Key]: RawRow;
};
export type Align = 'left' | 'center' | 'right';
export type Visibility = 'visible' | 'hidden';
export type Display = 'block' | 'none';
export declare const keyTupleToKey: (keyArray: KeyTuple) => Key;
export declare const keyToKeyTuple: (key: Key) => KeyTuple;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Action = 'page' | 'insert' | 'select' | 'update' | '_delete' | 'rpc' | 'login' | 'logout';
export interface BaseDto {
    action: Action;
}
export interface BaseQuery {
    action: 'page';
}
export interface LoginDto extends BaseDto {
    tzOffset: JSONString<number>;
    username: string;
    password: string;
}
export interface PageActionDto extends BaseDto {
    page: string;
    newMode: boolean;
    params?: Record<string, Scalar>;
}
export interface PageActionQuery extends ParsedQs {
    action: 'page';
    page: string;
    newMode?: JSONString<boolean>;
    params?: Record<string, JSONString<Nullable<Scalar>>>;
}
export interface SelectActionDto extends BaseDto {
    page: Nullable<string>;
    form: Nullable<string>;
    ds: string;
    params: Record<string, any>;
}
export interface SelectActionQuery extends ParsedQs {
    action: 'select';
    page?: string;
    form?: string;
    ds: string;
    params?: Record<string, JSONString<any>>;
}
export interface InsertActionDto extends BaseDto {
    page: string;
    form: string;
    row: RawRow;
    uuid: string;
}
export interface UpdateActionDto {
    page: string;
    form: string;
    uuid: string;
    changes: ChangesByKey;
}
export interface DeleteActionDto extends BaseDto {
    page: string;
    form: string;
    uuid: string;
    params: Record<string, any>;
}
export interface RpcActionDto extends BaseDto {
    uuid: string;
    name: string;
    page?: string;
    form?: string;
    params: Record<string, any>;
}
export interface CreateAppDto {
    folder: string;
    name: string;
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
export interface EditorPostDto {
    controller: string;
    action: string;
}
export declare function parseJson(json: JSONString): any;
export type QueryRecord = Record<string, string>;
export type Query = Record<string, string | QueryRecord>;
