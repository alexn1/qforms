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
        if (context.body           === undefined) context.body           = req.body;
        if (context.params         === undefined) context.params         = req.body.params ? req.body.params : {};
        if (context.newMode        === undefined) context.newMode        = req.body.newMode;
        if (context.parentPageName === undefined) context.parentPageName = req.body.parentPageName;
        if (context.row            === undefined) context.row            = req.body.row;

        if (context.connections === undefined) {
            context.connections = {};
        }
        if (context.querytime === undefined) {
            context.querytime = {};
        }
        if (context.querytime.params === undefined) {
            context.querytime.params = {};
        }
        return context;
    }

    static destroy(context) {
        /*for (const name in context.connections) {
            //console.log('release connection: ' + name);
            context.connections[name].release();
        }*/
    }
}

module.exports = Context;
