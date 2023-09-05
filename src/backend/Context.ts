import { ParsedQs } from 'qs';
import { Request, Response } from 'express';
import { Nullable, Optional, RequestBody } from '../types';
import { ServerUser } from './viewer';

export type RequestEx = Request & {
    session: any;
    files: Record<string, any>;
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

export class Context {
    connections: {
        [name: string]: any;
    } = {};
    files: {
        [name: string]: any;
    } = {};
    params: Record<string, any>;
    querytimeParams: Record<string, any> = {}; // for runtime query params

    constructor(public options: ContextOptions = {}) {
        // debug('Context', options);

        const req = this.getReq();

        // params
        this.params = {
            ...(req && req.body.params ? req.body.params : {}),
        };

        // files
        if (req && req.files) {
            for (const name in req.files) {
                this.files[name] = req.files[name].buffer;
            }
        }
    }

    getRoute(): string {
        return `${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }

    getVirtualPath(): string {
        return `/${this.getModule()}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }

    getUser(): Nullable<ServerUser> {
        const route = this.getRoute();
        const req = this.getReq();
        if (!req) return null;
        if (req.session.user && req.session.user[route]) {
            return req.session.user[route];
        }
        return null;
    }

    getSession(): any {
        return this.getReq()!.session;
    }

    getClientTimezoneOffset(): Nullable<number> {
        if (typeof this.getSession().tzOffset === 'number') {
            return this.getSession().tzOffset;
        }
        return null;
    }

    getTimeOffset(): Nullable<number> {
        const clientTimezoneOffset = this.getClientTimezoneOffset();
        if (clientTimezoneOffset === null) {
            return null;
        }
        return new Date().getTimezoneOffset() - clientTimezoneOffset;
    }

    getCookies(): Record<string, string> {
        return this.getReq()!.cookies || {};
    }

    getQuery(): ParsedQs {
        const req = this.getReq();
        if (!req) throw new Error('context: no req');
        return req.query;
    }

    getParams(): Record<string, any> {
        // debug('Context.getParams:');
        const user = this.getUser();
        const timeOffset = this.getTimeOffset();
        return {
            ...this.getCookies(),
            ...this.getQuery(),
            ...this.params,
            ...this.querytimeParams,
            ...(user ? { userId: user.id, userName: user.name } : {}),
            ...(timeOffset !== null ? { timeOffset } : {}),
        };
    }

    getReq(): Optional<RequestEx> {
        // if (!this.options.req) throw new Error('getRes: no req');
        return this.options.req as RequestEx;
    }

    getRes(): Response {
        if (!this.options.res) throw new Error('getRes: no res');
        return this.options.res;
    }

    getBody(): RequestBody {
        const req = this.getReq();
        if (!req) throw new Error('getBody: not request');
        return req.body;
    }

    getModule(): string {
        if (this.options.module) {
            return this.options.module;
        }
        return this.getReq()!.params.module;
    }

    getDomain(): string {
        if (this.options.domain) {
            return this.options.domain;
        }
        if (this.getReq()!.params.domain) {
            return this.getReq()!.params.domain;
        }
        throw new Error('domain not defined');
    }

    getAppDirName(): string {
        if (this.options.appDirName) {
            return this.options.appDirName;
        }
        return this.getReq()!.params.appDirName;
    }

    getAppFileName(): string {
        if (this.options.appFileName) {
            return this.options.appFileName;
        }
        return this.getReq()!.params.appFileName;
    }

    getEnv(): string {
        if (this.options.env) {
            return this.options.env;
        }
        return this.getReq()!.params.env;
    }

    getUri(): string {
        return this.getReq()!.params['0'];
    }

    getIp(): string {
        return Context.getIpFromReq(this.getReq()!);
    }

    getHost(): string {
        return this.getReq()!.headers.host!;
    }

    getProtocol(): string {
        return (this.getReq()!.headers['x-forwarded-proto'] as string) || 'http';
    }

    setVersionHeaders(platformVersion: string, appVersion: Nullable<string>): void {
        this.getRes().setHeader('qforms-platform-version', platformVersion);
        if (appVersion) {
            this.getRes().setHeader('qforms-app-version', appVersion);
        }
    }

    setParam(name: string, value: any): void {
        this.params[name] = value;
    }

    getParam(name: string): any {
        const params = this.getParams();
        return params[name];
    }

    isDebugMode(): boolean {
        return this.getQuery()['debug'] === '1';
    }

    getUrl(): URL {
        const req = this.getReq()!;
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        // debug('Context.getUrl', fullUrl);
        return new URL(fullUrl);
    }

    static getIpFromReq(req: Request): string {
        return (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress!;
    }

    destroy(): void {}
}
