class Context {
    static create(context) {
        if (context === undefined) {
            context = {};
        }
        if (context.params === undefined) {
            context.params = {};
        }
        if (context.querytime === undefined) {
            context.querytime = {};
        }
        if (context.querytime.params === undefined) {
            context.querytime.params = {};
        }
        if (context.req) {
            const route = [context.req.params.appDirName, context.req.params.appFileName, context.req.params.env].join('/');
            if (context.req.session.user && context.req.session.user[route]) {
                context.user = context.req.session.user[route];
            }
        }
        if (context.connections === undefined) {
            context.connections = {};
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
