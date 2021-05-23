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

    static create(req) {
        if (!req) throw new Error('no req');
        const context: Context = {req};

        // request
        context.uri         = req.params['0'];
        context.module      = req.params.module;
        context.appDirName  = req.params.appDirName;
        context.appFileName = req.params.appFileName;
        context.env         = req.params.env;

        // route
        context.route = [context.appDirName, context.appFileName, context.env].join('/');

        // user
        if (req.session.user && req.session.user[context.route]) {
            context.user = req.session.user[context.route];
        }

        // params
        /*if (context.query            === undefined)*/ context.query            = req.query        ? Helper.decodeObject(req.query)         : {};
        /*if (context.params           === undefined)*/ context.params           = req.body.params  ? Helper.decodeObject(req.body.params)   : {};
        /*if (context.changes          === undefined)*/ context.changes          = req.body.changes ? Helper.decodeChanges(req.body.changes) : {};
        /*if (context.newMode          === undefined)*/ context.newMode          = req.body.newMode;
        /*if (context.parentPageName   === undefined)*/ context.parentPageName   = req.body.parentPageName;

        // cnn
        /*if (context.connections      === undefined)*/ context.connections      = {};
        /*if (context.querytime        === undefined)*/ context.querytime        = {};
        /*if (context.querytime.params === undefined)*/ context.querytime.params = {};
        /*context.files = {};
        if (req.files) {
            for (const name in req.files) {
                context.files[name] = req.files[name].buffer;
            }
        }*/
        return context;
    }

    static destroy(context) {
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
    static getUser(context) {
        return context.req.session.user[context.route];
    }
}

export = Context;
