"use strict";
class Context {
    constructor(options) {
        // console.log('Context', options);
        this.options = options;
        // if (!options.domain) throw new Error('no domain');
        // query
        this.query = Object.assign({}, (this.getReq() && this.getReq().query ? this.getReq().query : {}));
        // params
        this.params = Object.assign({}, (this.getReq() && this.getReq().body.params ? this.getReq().body.params : {}));
        // files
        this.files = {};
        if (this.getReq() && this.getReq().files) {
            for (const name in this.getReq().files) {
                this.files[name] = this.getReq().files[name].buffer;
            }
        }
        // connections
        this.connections = {};
        // querytime
        this.querytime = { params: {} };
    }
    getRoute() {
        return `${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }
    getVirtualPath() {
        return `/${this.getModule()}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }
    getUser() {
        const route = this.getRoute();
        if (this.getReq().session.user && this.getReq().session.user[route]) {
            return this.getReq().session.user[route];
        }
        return null;
    }
    getClientTimezoneOffset() {
        if (this.getReq().session.tzOffset !== undefined && this.getReq().session.tzOffset !== null) {
            return this.getReq().session.tzOffset;
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
    getCookies() {
        return Object.assign({}, (this.getReq() && this.getReq().cookies ? this.getReq().cookies : {}));
    }
    getQuery() {
        return Object.assign({}, (this.getReq() && this.getReq().query ? this.getReq().query : {}));
    }
    getParams() {
        // console.log('Context.getParams:');
        const user = this.getUser();
        const timeOffset = this.getTimeOffset();
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this.getCookies()), this.query), this.params), (this.querytime ? this.querytime.params : {})), (user ? { userId: user.id, userName: user.name } : {})), (timeOffset !== null ? { timeOffset } : {}));
    }
    getReq() {
        return this.options.req;
    }
    getRes() {
        return this.options.res;
    }
    getBody() {
        return this.getReq().body;
    }
    getModule() {
        if (this.options.module) {
            return this.options.module;
        }
        return this.getReq().params.module;
    }
    getDomain() {
        if (this.options.domain) {
            return this.options.domain;
        }
        return this.getReq().params.domain;
    }
    getAppDirName() {
        if (this.options.appDirName) {
            return this.options.appDirName;
        }
        return this.getReq().params.appDirName;
    }
    getAppFileName() {
        if (this.options.appFileName) {
            return this.options.appFileName;
        }
        return this.getReq().params.appFileName;
    }
    getEnv() {
        if (this.options.env) {
            return this.options.env;
        }
        return this.getReq().params.env;
    }
    getUri() {
        return this.getReq().params['0'];
    }
    getIp() {
        return this.getReq().headers['x-forwarded-for'] || this.getReq().connection.remoteAddress;
    }
    getHost() {
        return this.getReq().headers.host;
    }
    getProtocol() {
        return this.getReq().headers['x-forwarded-proto'] || 'http';
    }
    setVersionHeaders(platformVersion, appVersion) {
        this.getRes().setHeader('qforms-platform-version', platformVersion);
        this.getRes().setHeader('qforms-app-version', appVersion);
    }
    setParam(name, value) {
        this.params[name] = value;
    }
    destroy() {
    }
}
module.exports = Context;
