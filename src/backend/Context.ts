import Helper from './Helper';

class Context {
    options: any;
    // req: any;
    // domain: string;
    query: any;
    params: any;
    connections: any;
    querytime: any;
    files: any;

    constructor(options) {
        this.options = options;
        if (!options.req) throw new Error('no req');
        if (!options.domain) throw new Error('no domain');

        // const req    = options.req;
        // const domain = options.domain;

        // if (!req.params.module) throw new Error('no module');
        if (!this.getReq().params.appDirName) throw new Error('no appDirName');
        if (!this.getReq().params.appFileName) throw new Error('no appFileName');
        if (!this.getReq().params.env) throw new Error('no env');


        // req, domain
        // this.req    = req;
        // this.domain = domain;

        // params
        this.query  = {
            ...(this.getReq() && this.getReq().query ? this.getReq().query : {})
        };
        this.params = {
            ...(this.getReq() && this.getReq().body.params ? this.getReq().body.params : {})
        };

        // cnn
        this.connections = {};
        this.querytime   = {
            params : {}
        };

        // files
        this.files = {};
        if (this.getReq() && this.getReq().files) {
            for (const name in this.getReq().files) {
                this.files[name] = this.getReq().files[name].buffer;
            }
        }
    }
    getRoute(): string {
        return `${this.getDomain()}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}`;
    }
    destroy() {
    }
    getUser(): any {
        const route = this.getRoute();
        if (this.getReq().session.user && this.getReq().session.user[route]) {
            return this.getReq().session.user[route];
        }
        return null;
    }
    getVirtualPath(): string {
        return `/${this.getModule()}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}`;
    }
    getClientTimezoneOffset(): number {
        if (this.getReq().session.tzOffset !== undefined && this.getReq().session.tzOffset !== null) {
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
    getParams(): any {
        // console.log('Context.getParams:');
        const user = this.getUser();
        const timeOffset = this.getTimeOffset();
        return {
            ...this.query,
            ...this.params,
            ...(this.querytime ? this.querytime.params : {}),
            ...(user ? {username: user.name} : {}),
            ...(timeOffset !== null ? {timeOffset} : {})
        };
    }
    getReq() {
        return this.options.req;
    }
    getDomain() {
        return this.options.domain;
    }
    getBody(): any {
        return this.getReq().body;
    }
    getModule(): string {
        return this.getReq().params.module;
    }
    getAppDirName(): string {
        return this.getReq().params.appDirName;
    }
    getAppFileName(): string {
        return this.getReq().params.appFileName;
    }
    getEnv(): string {
        return this.getReq().params.env;
    }
    getUri(): string {
        return this.getReq().params['0'];
    }
    getIp(): string {
        return this.getReq().headers['x-forwarded-for'] || this.getReq().connection.remoteAddress;
    }
}

export = Context;
