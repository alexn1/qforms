import { Request, Response } from 'express';
import { Nullable, Optional, RequestBody } from '../types';
declare module 'express' {
    interface Request {
        session: any;
        headers: any;
        files: any;
    }
}
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
    query: {
        [name: string]: any;
    };
    connections: {
        [name: string]: any;
    };
    files: {
        [name: string]: any;
    };
    querytime: any;
    params: Record<string, any>;
    constructor(options?: ContextOptions);
    getRoute(): string;
    getVirtualPath(): string;
    getUser(): any;
    getClientTimezoneOffset(): Nullable<number>;
    getTimeOffset(): Nullable<number>;
    getCookies(): Record<string, string>;
    getQuery(): Record<string, any>;
    getParams(): Record<string, any>;
    getReq(): Optional<Request>;
    getRes(): Response;
    getBody(): RequestBody;
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
    setParam(name: string, value: any): void;
    getParam(name: string): any;
    isDebugMode(): boolean;
    getUrl(): URL;
    static getIpFromReq(req: Request): any;
    destroy(): void;
}
