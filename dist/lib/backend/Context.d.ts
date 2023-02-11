import { Request, Response } from 'express';
declare module 'express' {
    interface Request {
        session: any;
        headers: any;
        files: any;
    }
}
export declare class Context {
    options: any;
    query: any;
    params: any;
    files: any;
    connections: any;
    querytime: any;
    constructor(options: any);
    getRoute(): string;
    getVirtualPath(): string;
    getUser(): any;
    getClientTimezoneOffset(): number | null;
    getTimeOffset(): number | null;
    getCookies(): any;
    getQuery(): any;
    getParams(): any;
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
    destroy(): void;
}
