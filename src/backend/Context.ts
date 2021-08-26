import Helper from './Helper';

class Context {
    req: any;
    domain: string;

    uri: string;
    module: string;
    appDirName: string;
    appFileName: string;
    env: string;

    route: string;
    query: any;
    params: any;
    changes: any;
    newMode: any;
    connections: any;
    querytime: any;
    files: any;

    constructor(options) {
        const req    = options.req;
        const domain = options.domain;

        // check
        if (!req) throw new Error('no req');
        if (!req.params.appDirName) throw new Error('no appDirName');
        if (!req.params.appFileName) throw new Error('no appFileName');
        if (!req.params.env) throw new Error('no env');
        if (!domain) throw new Error('no domain');

        // req, domain
        this.req    = req;
        this.domain = domain;

        // req.params
        this.uri         = req.params['0'];
        this.module      = req.params.module;
        this.appDirName  = req.params.appDirName;
        this.appFileName = req.params.appFileName;
        this.env         = req.params.env;

        // route
        this.route = this.calcRoute();

        // params
        this.query            = req.query        ? Helper.decodeObject(req.query)         : {};
        this.params           = req.body.params  ? Helper.decodeObject(req.body.params)   : {};
        this.changes          = req.body.changes ? Helper.decodeChanges(req.body.changes) : {};
        this.newMode          = req.body.newMode;

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

    calcRoute() {
        return [this.domain, this.appDirName, this.appFileName, this.env].join('/');
    }
    destroy() {
    }
    getUser() {
        if (this.req.session.user && this.req.session.user[this.route]) {
            return this.req.session.user[this.route];
        }
        return null;
    }
    getRoute() {
        return this.route;
    }
    getVirtualPath(): string {
        return `/${this.module}/${this.appDirName}/${this.appFileName}/${this.env}`;
    }
    getTimezoneOffset() {
        return this.req.session.tzOffset;
    }
}

export = Context;
