import { ParsedQs } from 'qs';
import { Query, Action, JSONString, Scalar, Nullable, RawRow, ChangesByKey } from '../../types';
import { PageData } from '../../common';
export interface BaseDto {
    action: Action;
}
export interface BaseQuery extends ParsedQs {
    action: Action;
}
export interface LoginActionDto extends BaseDto {
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
    action: string;
    page: string;
    newMode?: JSONString<boolean>;
    params?: Record<string, JSONString<Nullable<Scalar>>>;
}
export interface PageActionResponse {
    page: PageData;
}
export interface ReadActionQuery extends ParsedQs {
    action: string;
    page?: string;
    form?: string;
    ds: string;
    params?: Record<string, JSONString<any>>;
}
export interface ReadActionResponse {
    rows: RawRow[];
    count: Nullable<number>;
    time: number;
}
export interface CreateActionDto extends BaseDto {
    page: string;
    form: string;
    row: RawRow;
    uuid: string;
}
export interface UpdateActionDto {
    action: Action.update;
    page: string;
    form: string;
    uuid: string;
    changes: ChangesByKey;
}
export interface DeleteActionDto {
    action: Action.delete;
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
export declare function createReadQuery(page: string, form: string, ds: string, params?: Record<string, any>): Query;
