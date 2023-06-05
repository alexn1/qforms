import { Request, Response } from 'express';

import { Params } from '../types';

declare module 'express' {
    export interface Request {
        session: any;
        headers: any;
        files: any;
    }
}

export interface ContextOptions {
    domain?: string;
    req?: Request;
    res?: Response;
    module?: string;
    appDirName?: string;
    appFileName?: string;
    env?: string;
}

export class Context {
    query: {
        [name: string]: any;
    };
    connections: {
        [name: string]: any;
    } = {};
    files: {
        [name: string]: any;
    };
    querytime: any = { params: {} };
    params: Params;

    constructor(public options: ContextOptions = {}) {
        // console.log('Context', options);

        // query
        this.query = {
            ...(this.getReq() && this.getReq().query ? this.getReq().query : {}),
        };

        // params
        this.params = {
            ...(this.getReq() && this.getReq().body.params ? this.getReq().body.params : {}),
        };

        // files
        this.files = {};
        if (this.getReq() && this.getReq().files) {
            for (const name in this.getReq().files) {
                this.files[name] = this.getReq().files[name].buffer;
            }
        }

        // connections
        // this.connections = {};

        // querytime
        // this.querytime = { params: {} };
    }

    getRoute(): string {
        return `${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }

    getVirtualPath(): string {
        return `/${this.getModule()}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }

    getUser(): any {
        const route = this.getRoute();
        if (this.getReq().session.user && this.getReq().session.user[route]) {
            return this.getReq().session.user[route];
        }
        return null;
    }

    getClientTimezoneOffset(): number {
        if (
            this.getReq().session.tzOffset !== undefined &&
            this.getReq().session.tzOffset !== null
        ) {
            return this.getReq().session.tzOffset;
        }
        return null;
    }

    getTimeOffset(): number {
        const clientTimezoneOffset = this.getClientTimezoneOffset();
        if (clientTimezoneOffset !== null) {
            return new Date().getTimezoneOffset() - clientTimezoneOffset;
        }
        return null;
    }

    getCookies(): { [name: string]: string } {
        return {
            ...(this.getReq() && this.getReq().cookies ? this.getReq().cookies : {}),
        };
    }

    getQuery(): any {
        return {
            ...(this.getReq() && this.getReq().query ? this.getReq().query : {}),
        };
    }

    getParams(): Params {
        // console.log('Context.getParams:');
        const user = this.getUser();
        const timeOffset = this.getTimeOffset();
        return {
            ...this.getCookies(),
            ...this.query,
            ...this.params,
            ...(this.querytime ? this.querytime.params : {}),
            ...(user ? { userId: user.id, userName: user.name } : {}),
            ...(timeOffset !== null ? { timeOffset } : {}),
        };
    }

    getReq(): Request {
        return this.options.req;
    }

    getRes(): Response {
        return this.options.res;
    }

    getBody(): any {
        return this.getReq().body;
    }

    getModule(): string {
        if (this.options.module) {
            return this.options.module;
        }
        return this.getReq().params.module;
    }

    getDomain(): string {
        if (this.options.domain) {
            return this.options.domain;
        }
        if (this.getReq().params.domain) {
            return this.getReq().params.domain;
        }
        throw new Error('domain not defined');
    }

    getAppDirName(): string {
        if (this.options.appDirName) {
            return this.options.appDirName;
        }
        return this.getReq().params.appDirName;
    }

    getAppFileName(): string {
        if (this.options.appFileName) {
            return this.options.appFileName;
        }
        return this.getReq().params.appFileName;
    }

    getEnv(): string {
        if (this.options.env) {
            return this.options.env;
        }
        return this.getReq().params.env;
    }

    getUri(): string {
        return this.getReq().params['0'];
    }

    getIp(): string {
        return Context.getIpFromReq(this.getReq());
    }

    getHost(): string {
        return this.getReq().headers.host;
    }

    getProtocol(): string {
        return this.getReq().headers['x-forwarded-proto'] || 'http';
    }

    setVersionHeaders(platformVersion: string, appVersion: string): void {
        this.getRes().setHeader('qforms-platform-version', platformVersion);
        this.getRes().setHeader('qforms-app-version', appVersion);
    }

    setParam(name: string, value): void {
        this.params[name] = value;
    }

    getParam(name: string): any {
        const params = this.getParams();
        return params[name];
    }

    isDebugMode(): boolean {
        return this.query['debug'] === '1';
    }

    getUrl(): URL {
        const req = this.getReq();
        var fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        // console.log('Context.getUrl', fullUrl);
        return new URL(fullUrl);
    }

    static getIpFromReq(req: Request) {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }

    destroy(): void {}
}
