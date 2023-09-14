/// <reference types="express-session" />
import { ParsedQs } from 'qs';
import { Request, Response } from 'express';
import { Action, Nullable, Optional } from '../types';
import { ServerUser } from './viewer';
import { Session } from './Session';
export type RequestEx = Request & {
    session: Session;
};
export interface ContextOptions {
    domain?: Nullable<string>;
    req?: Request;
    res?: Response;
    module?: string;
    appDirName?: string;
    appFileName?: string;
    env?: string;
}
export declare class Context {
    options: ContextOptions;
    private params;
    connections: {
        [name: string]: any;
    };
    constructor(options?: ContextOptions);
    getQueryParams(): Record<string, any>;
    getBodyParams(): Record<string, any>;
    getRoute(): string;
    getVirtualPath(): string;
    getUser(): Nullable<ServerUser>;
    getSession(): import("express-session").Session & Partial<import("express-session").SessionData> & Session;
    getClientTimezoneOffset(): Nullable<number>;
    getTimeOffset(): Nullable<number>;
    getCookies(): Record<string, string>;
    getQuery(): ParsedQs;
    getBody(): any;
    getAllParams(): Record<string, any>;
    getReq(): Optional<RequestEx>;
    getRes(): Response;
    getModule(): string;
    getDomain(): string;
    getAppDirName(): string;
    getAppFileName(): string;
    getEnv(): string;
    getUri(): string;
    getIp(): string;
    getHost(): string;
    getProtocol(): string;
    setVersionHeaders(platformVersion: string, appVersion: Nullable<string>): void;
    getParam(name: string): any;
    setParam(name: string, value: any): void;
    getParams(): Record<string, any>;
    getAllParam(name: string): any;
    isDebugMode(): boolean;
    getUrl(): URL;
    getAction(): Nullable<Action>;
    static getIpFromReq(req: Request): string;
    destroy(): void;
}
