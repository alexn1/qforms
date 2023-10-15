import { ParsedQs } from 'qs';
import { Request, Response } from 'express';
import { Action, JSONString, Nullable, Optional, Scalar } from '../types';
import { ServerUser } from './viewer';
import { Session } from './Session';
import { LogLevel, pConsole } from '../pConsole';
import { log } from '../decorators';
import { Helper, BaseDto, BaseQuery } from '../frontend';

export type RequestEx = Request & {
    session: Session;
    // files: Record<string, any>;
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
    private params: Record<string, any>;

    connections: {
        [name: string]: any;
    } = {};

    /* files: {
        [name: string]: any;
    } = {}; */

    constructor(public options: ContextOptions = {}) {
        // debug('Context', options);

        // params
        this.params = {
            ...this.getQueryParams(),
            ...this.getBodyParams(),
        };

        // files
        /* if (req && req.files) {
            for (const name in req.files) {
                this.files[name] = req.files[name].buffer;
            }
        } */
    }

    getQueryParams(): Record<string, Nullable<Scalar>> {
        // pConsole.debug('getQueryParams:', this.getReq()?.query?.params);
        const req = this.getReq();
        const action = this.getAction();
        if (req && action && [Action.page, Action.read].includes(action) && req.query.params) {
            return Helper.decodeObject(req.query.params as Record<string, JSONString>);
        }
        return {};
    }

    getBodyParams(): Record<string, any> {
        const req = this.getReq();
        if (req && req.body.params) {
            return req.body.params;
        }
        return {};
    }

    getRoute(): string {
        return `${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }

    getVirtualPath(): string {
        return `/${this.getModule()}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }

    getUser(): Nullable<ServerUser> {
        const req = this.getReq();
        if (!req) return null;
        const session = this.getSession();
        const route = this.getRoute();
        if (session.user && session.user[route]) {
            return session.user[route];
        }
        return null;
    }

    getSession() {
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
        return this.getReq()?.query || {};
    }

    getBody(): any {
        return this.getReq()?.body || {};
    }

    getAllParams(): Record<string, any> {
        // debug('Context.getParams:');
        const user = this.getUser();
        const timeOffset = this.getTimeOffset();
        return {
            ...this.getCookies(),
            ...this.getQuery(),
            ...this.params,
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

    getParam(name: string): any {
        return this.params[name];
    }

    setParam(name: string, value: any): void {
        this.params[name] = value;
    }

    getParams(): Record<string, any> {
        return this.params;
    }

    getAllParam(name: string): any {
        const params = this.getAllParams();
        return params[name];
    }

    /* isDebugMode(): boolean {
        return this.getQuery()['debug'] === '1';
    } */

    getUrl(): URL {
        const req = this.getReq()!;
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        return new URL(fullUrl);
    }

    getAction(): Nullable<Action> {
        const req = this.getReq();
        if (!req) {
            return null;
        }
        if (req.method === 'GET') {
            const { action } = this.getQuery() as BaseQuery;
            return action || null;
        }
        const { action } = this.getBody() as BaseDto;
        return action || null;
    }

    static getIpFromReq(req: Request): string {
        return (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress!;
    }

    getPage(): Nullable<string> {
        if (this.getQuery().page) {
            return this.getQuery().page as string;
        }
        return null;
    }

    @log(LogLevel.debug)
    destroy(): void {}
}
