import { Request, Response } from 'express';
import { Params } from '../types';
declare module 'express' {
    interface Request {
        session: any;
        headers: any;
        files: any;
    }
}
export interface ContextOptions {
    domain?: string | null;
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
    params: Params;
    constructor(options?: ContextOptions);
    getRoute(): string;
    getVirtualPath(): string;
    getUser(): any;
    getClientTimezoneOffset(): number | null;
    getTimeOffset(): number | null;
    getCookies(): {
        [name: string]: string;
    };
    getQuery(): any;
    getParams(): Params;
    getReq(): Request | undefined;
    getRes(): Response;
    getBody(): any;
    getModule(): string;
    getDomain(): string;
    getAppDirName(): string;
    getAppFileName(): string;
    getEnv(): string;
    getUri(): string;
    getIp(): string;
    getHost(): string;
    getProtocol(): string;
    setVersionHeaders(platformVersion: string, appVersion: string | null): void;
    setParam(name: string, value: any): void;
    getParam(name: string): any;
    isDebugMode(): boolean;
    getUrl(): URL;
    static getIpFromReq(req: Request): any;
    destroy(): void;
}
