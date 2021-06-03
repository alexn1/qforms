import Helper from './Helper';

class Context {
    req: any;
    uri?: string;
    module?: string;
    appDirName?: string;
    appFileName?: string;
    env?: any;
    route?: string;
    user?: any;
    query?: any;
    params?: any;
    changes?: any;
    newMode?: any;
    parentPageName?: string;
    connections?: any;
    querytime?: any;
    files: any;

    constructor(req) {
        if (!req) throw new Error('no req');
        this.req = req;

        // request
        this.uri         = req.params['0'];
        this.module      = req.params.module;
        this.appDirName  = req.params.appDirName;
        this.appFileName = req.params.appFileName;
        this.env         = req.params.env;

        // route
        this.route = [this.appDirName, this.appFileName, this.env].join('/');

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

    static destroy(context: Context) {
        if (!context) return;
        /*for (const name in context.connections) {
            //console.log('release connection: ' + name);
            context.connections[name].release();
        }*/
    }
    /*static decodeValue(rawValue) {
        return JSON.parse(rawValue, Context.dateTimeReviver);
    }*/
    /*static decodeObject(obj) {
        const dObj = {};
        for (const name in obj) {
            if (typeof obj[name] !== 'string') throw new Error(`cannot decode: ${name}, type: ${typeof obj[name]}`);
            dObj[name] = Helper.decodeValue(obj[name]);
        }
        return dObj;
    }*/
    /*static decodeChanges(changes) {
        const dChanges = {};
        for (const key in changes) {
            dChanges[key] = Helper.decodeObject(changes[key]);
        }
        return dChanges;
    }*/
    /*static dateTimeReviver(key, value) {
        if (typeof value === 'string') {
            const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(value);
            if (a) return new Date(value);
        }
        return value;
    }*/
    getUser() {
        return this.req.session.user[this.route];
    }
}

export = Context;
