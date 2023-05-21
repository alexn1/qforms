import { Request, Response } from 'express';
import { Params } from '../types';
declare module 'express' {
    interface Request {
        session: any;
        headers: any;
        files: any;
    }
}
export declare class Context {
    options: {
        domain: string;
        req?: Request;
        res?: Response;
        module?: string;
        appDirName?: string;
        appFileName?: string;
        env?: string;
    };
    query: {
        [name: string]: any;
    };
    params: Params;
    connections: {
        [name: string]: any;
    };
    files: any;
    querytime: any;
    constructor(options: {
        domain: string;
        req?: Request;
        res?: Response;
        module?: string;
        appDirName?: string;
        appFileName?: string;
        env?: string;
    });
    getRoute(): string;
    getVirtualPath(): string;
    getUser(): any;
    getClientTimezoneOffset(): number;
    getTimeOffset(): number;
    getCookies(): {
        [name: string]: string;
    };
    getQuery(): any;
    getParams(): Params;
    getReq(): Request;
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
    setVersionHeaders(platformVersion: string, appVersion: string): void;
    setParam(name: string, value: any): void;
    getParam(name: string): any;
    isDebugMode(): boolean;
    getUrl(): URL;
    destroy(): void;
}