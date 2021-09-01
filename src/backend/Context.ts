import Helper from './Helper';

class Context {
    req: any;
    domain: string;
    query: any;
    params: any;
    connections: any;
    querytime: any;
    files: any;

    constructor(options) {
        const req    = options.req;
        const domain = options.domain;

        // check
        if (!req) throw new Error('no req');
        if (!req.params.module) throw new Error('no module');
        if (!req.params.appDirName) throw new Error('no appDirName');
        if (!req.params.appFileName) throw new Error('no appFileName');
        if (!req.params.env) throw new Error('no env');
        if (!domain) throw new Error('no domain');

        // req, domain
        this.req    = req;
        this.domain = domain;

        // req.params
        // this.uri         = req.params['0'];
        // this.module      = req.params.module;
        // this.appDirName  = req.params.appDirName;
        // this.appFileName = req.params.appFileName;
        // this.env         = req.params.env;

        // params
        this.query  = req.query       ? Helper.decodeObject(req.query)       : {};
        // this.params = req.body.params ? Helper.decodeObject(req.body.params) : {};
        this.params = {
            ...(req.body.params ? req.body.params : {})
        };

        // cnn
        this.connections = {};
        this.querytime   = {
            params : {}
        };

        // files
        this.files = {};
        if (req.files) {
            for (const name in req.files) {
                this.files[name] = req.files[name].buffer;
            }
        }
    }
    getRoute(): string {
        return `${this.domain}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}`;
    }
    destroy() {
    }
    getUser(): any {
        const route = this.getRoute();
        if (this.req.session.user && this.req.session.user[route]) {
            return this.req.session.user[route];
        }
        return null;
    }
    getVirtualPath(): string {
        return `/${this.getModule()}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}`;
    }
    getClientTimezoneOffset(): number {
        if (this.req.session.tzOffset !== undefined && this.req.session.tzOffset !== null) {
            return this.req.session.tzOffset;
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
    getBody(): any {
        return this.req.body;
    }
    getModule(): string {
        return this.req.params.module;
    }
    getAppDirName(): string {
        return this.req.params.appDirName;
    }
    getAppFileName(): string {
        return this.req.params.appFileName;
    }
    getEnv(): string {
        return this.req.params.env;
    }
    getUri(): string {
        return this.req.params['0'];
    }
}

export = Context;
