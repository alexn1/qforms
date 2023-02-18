import { Request, Response } from 'express';

declare module 'express' {
    export interface Request {
        session: any;
        headers: any;
        files: any;
    }
}

export class Context {
    query: {
        [name: string]: any;
    };
    params: {
        [name: string]: any;
    };
    connections: {
        [name: string]: any;
    };
    files: any;
    querytime: any;

    constructor(
        public options: {
            domain: string;
            req?: Request;
            res?: Response;
            module?: string;
            appDirName?: string;
            appFileName?: string;
            env?: string;
        },
    ) {
        // console.log('Context', options);
        // this.options = options;

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
        this.connections = {};

        // querytime
        this.querytime = { params: {} };
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

    getClientTimezoneOffset(): number | null {
        if (
            this.getReq().session.tzOffset !== undefined &&
            this.getReq().session.tzOffset !== null
        ) {
            return this.getReq().session.tzOffset;
        }
        return null;
    }

    getTimeOffset(): number | null {
        const clientTimezoneOffset = this.getClientTimezoneOffset();
        if (clientTimezoneOffset !== null) {
            return new Date().getTimezoneOffset() - clientTimezoneOffset;
        }
        return null;
    }

    getCookies(): any {
        return {
            ...(this.getReq() && this.getReq().cookies ? this.getReq().cookies : {}),
        };
    }

    getQuery(): any {
        return {
            ...(this.getReq() && this.getReq().query ? this.getReq().query : {}),
        };
    }

    getParams(): {[name: string]: any} {
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
        return this.getReq().params.domain;
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
        return this.getReq().headers['x-forwarded-for'] || this.getReq().connection.remoteAddress;
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

    destroy(): void {}
}
