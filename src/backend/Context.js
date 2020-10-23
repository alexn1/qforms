class Context {
    static create(context) {
        if (context === undefined) {
            context = {};
        }
        const req = context.req;
        if (req) {
            const route = [req.params.appDirName, req.params.appFileName, req.params.env].join('/');
            if (req.session.user && req.session.user[route]) {
                context.user = req.session.user[route];
            }
        }
        // if (context.body             === undefined) context.body             = req.body;
        if (context.changes          === undefined) context.changes          = Context.decodeChanges(req.body.changes);
        if (context.params           === undefined) context.params           = req.body.params ? Context.decodeObject(req.body.params) : {};
        if (context.newMode          === undefined) context.newMode          = req.body.newMode;
        if (context.parentPageName   === undefined) context.parentPageName   = req.body.parentPageName;
        if (context.row              === undefined) context.row              = Context.decodeObject(req.body.row);
        if (context.connections      === undefined) context.connections      = {};
        if (context.querytime        === undefined) context.querytime        = {};
        if (context.querytime.params === undefined) context.querytime.params = {};
        return context;
    }

    static destroy(context) {
        if (!context) return;
        /*for (const name in context.connections) {
            //console.log('release connection: ' + name);
            context.connections[name].release();
        }*/
    }
    static decodeObject(obj) {
        const dObj = {};
        for (const name in obj) {
            dObj[name] = JSON.parse(obj[name], Context.dateTimeReviver);
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
