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
export type RawModel<T> = {
    [K in keyof T]: JSONString<T[K]>;
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
export declare enum Action {
    page = "page",
    create = "create",
    read = "read",
    update = "update",
    delete = "delete",
    rpc = "rpc",
    login = "login",
    logout = "logout"
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
export type Route = [
    module: 'viewer' | 'editor',
    appDirName: string,
    appFileName: string,
    env: string,
    domain?: string
];
