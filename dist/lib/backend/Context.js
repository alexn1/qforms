"use strict";
class Context {
    constructor(options) {
        const req = options.req;
        const domain = options.domain;
        // check
        if (!req)
            throw new Error('no req');
        if (!req.params.module)
            throw new Error('no module');
        if (!req.params.appDirName)
            throw new Error('no appDirName');
        if (!req.params.appFileName)
            throw new Error('no appFileName');
        if (!req.params.env)
            throw new Error('no env');
        if (!domain)
            throw new Error('no domain');
        // req, domain
        this.req = req;
        this.domain = domain;
        // params
        // this.query  = req.query       ? Helper.decodeObject(req.query)       : {};
        this.query = Object.assign({}, (req.query ? req.query : {}));
        // this.params = req.body.params ? Helper.decodeObject(req.body.params) : {};
        this.params = Object.assign({}, (req.body.params ? req.body.params : {}));
        // cnn
        this.connections = {};
        this.querytime = {
            params: {}
        };
        // files
        this.files = {};
        if (req.files) {
            for (const name in req.files) {
                this.files[name] = req.files[name].buffer;
            }
        }
    }
    getRoute() {
        return `${this.domain}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}`;
    }
    destroy() {
    }
    getUser() {
        const route = this.getRoute();
        if (this.req.session.user && this.req.session.user[route]) {
            return this.req.session.user[route];
        }
        return null;
    }
    getVirtualPath() {
        return `/${this.getModule()}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}`;
    }
    getClientTimezoneOffset() {
        if (this.req.session.tzOffset !== undefined && this.req.session.tzOffset !== null) {
            return this.req.session.tzOffset;
        }
        return null;
    }
    getTimeOffset() {
        const clientTimezoneOffset = this.getClientTimezoneOffset();
        if (clientTimezoneOffset !== null) {
            return new Date().getTimezoneOffset() - clientTimezoneOffset;
        }
        return null;
    }
    getParams() {
        // console.log('Context.getParams:');
        const user = this.getUser();
        const timeOffset = this.getTimeOffset();
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this.query), this.params), (this.querytime ? this.querytime.params : {})), (user ? { username: user.name } : {})), (timeOffset !== null ? { timeOffset } : {}));
    }
    getBody() {
        return this.req.body;
    }
    getModule() {
        return this.req.params.module;
    }
    getAppDirName() {
        return this.req.params.appDirName;
    }
    getAppFileName() {
        return this.req.params.appFileName;
    }
    getEnv() {
        return this.req.params.env;
    }
    getUri() {
        return this.req.params['0'];
    }
}
module.exports = Context;
