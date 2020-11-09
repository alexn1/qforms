class Context {
    static create(context) {
        if (context === undefined) {
            context = {};
        }
        if (!context.req) throw new Error('no req');
        const req = context.req;

        // req.params
        context.uri         = req.params['0'];
        context.module      = req.params.module;
        context.appDirName  = req.params.appDirName;
        context.appFileName = req.params.appFileName;
        context.env         = req.params.env;

        // route
        context.route       = Context.getRoute(context);

        // user
        if (req.session.user && req.session.user[context.route]) context.user = req.session.user[context.route];

        if (context.query            === undefined) context.query            = req.query ? Context.decodeObject(req.query) : {};
        if (context.changes          === undefined) context.changes          = Context.decodeChanges(req.body.changes);
        if (context.params           === undefined) context.params           = req.body.params ? Context.decodeObject(req.body.params) : {};
        if (context.newMode          === undefined) context.newMode          = req.body.newMode;
        if (context.parentPageName   === undefined) context.parentPageName   = req.body.parentPageName;
        if (context.row              === undefined) context.row              = Context.decodeObject(req.body.row);
        if (context.connections      === undefined) context.connections      = {};
        if (context.querytime        === undefined) context.querytime        = {};
        if (context.querytime.params === undefined) context.querytime.params = {};
        /*context.files = {};
        if (req.files) {
            for (const name in req.files) {
                context.files[name] = req.files[name].buffer;
            }
        }*/
        return context;
    }

    static getRoute(context) {
        return [context.appDirName, context.appFileName, context.env].join('/');
    }

    static destroy(context) {
        if (!context) return;
        /*for (const name in context.connections) {
            //console.log('release connection: ' + name);
            context.connections[name].release();
        }*/
    }
    static decodeValue(rawValue) {
        return JSON.parse(rawValue, Context.dateTimeReviver);
    }
    static decodeObject(obj) {
        const dObj = {};
        for (const name in obj) {
            if (typeof obj[name] !== 'string') throw new Error(`cannot decode: ${name}, type: ${typeof obj[name]}`);
            dObj[name] = Context.decodeValue(obj[name]);
        }
        return dObj;
    }
    static decodeChanges(changes) {
        const dChanges = {};
        for (const key in changes) {
            dChanges[key] = Context.decodeObject(changes[key]);
        }
        return dChanges;
    }
    static dateTimeReviver(key, value) {
        if (typeof value === 'string') {
            const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(value);
            if (a) return new Date(value);
        }
        return value;
    }
}

module.exports = Context;
