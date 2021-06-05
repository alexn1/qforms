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
    user: any;
    query: any;
    params: any;
    changes: any;
    newMode: any;
    parentPageName: string;
    connections: any;
    querytime: any;
    files: any;

    constructor(options) {
        const req    = options.req;
        const domain = options.domain;

        // req, domain
        if (!req) throw new Error('no req');
        if (!domain) throw new Error('no domain');
        this.req    = req;
        this.domain = domain;

        // request
        this.uri         = req.params['0'];
        this.module      = req.params.module;
        this.appDirName  = req.params.appDirName;
        this.appFileName = req.params.appFileName;
        this.env         = req.params.env;

        // route
        this.route = this.calcRoute();

        // user
        if (req.session.user && req.session.user[this.route]) {
            this.user = req.session.user[this.route];
        }

        // params
        this.query            = req.query        ? Helper.decodeObject(req.query)         : {};
        this.params           = req.body.params  ? Helper.decodeObject(req.body.params)   : {};
        this.changes          = req.body.changes ? Helper.decodeChanges(req.body.changes) : {};
        this.newMode          = req.body.newMode;
        this.parentPageName   = req.body.parentPageName;

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
        /*for (const name in this.connections) {
            //console.log('release connection: ' + name);
            this.connections[name].release();
        }*/
    }
    getUser() {
        return this.req.session.user[this.route];
    }
}

export = Context;
