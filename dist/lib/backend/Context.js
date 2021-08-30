"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Helper_1 = __importDefault(require("./Helper"));
class Context {
    constructor(options) {
        const req = options.req;
        const domain = options.domain;
        // check
        if (!req)
            throw new Error('no req');
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
        // req.params
        this.uri = req.params['0'];
        this.module = req.params.module;
        this.appDirName = req.params.appDirName;
        this.appFileName = req.params.appFileName;
        this.env = req.params.env;
        // route
        this.route = this.calcRoute();
        // params
        this.query = req.query ? Helper_1.default.decodeObject(req.query) : {};
        this.params = req.body.params ? Helper_1.default.decodeObject(req.body.params) : {};
        this.changes = req.body.changes ? Helper_1.default.decodeChanges(req.body.changes) : {};
        this.newMode = req.body.newMode;
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
    getVirtualPath() {
        return `/${this.module}/${this.appDirName}/${this.appFileName}/${this.env}`;
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
}
module.exports = Context;
