"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const Model_1 = require("../Model");
const Database_1 = require("../Database/Database");
const common_1 = require("../../../common");
const Helper_1 = require("../../../common/Helper");
class Application extends Model_1.Model {
    constructor() {
        super(...arguments);
        this.databases = [];
        this.dataSources = [];
    }
    /* constructor(data) {
        super(data);
    } */
    init() {
        // console.log('Application.init');
        if (!this.data.theme)
            throw new Error('no theme attr');
        // databases
        for (const data of this.data.databases) {
            const database = new Database_1.Database(data, this);
            database.init();
            this.addDatabase(database);
        }
        // data sources
        this.createDataSources();
    }
    deinit() {
        this.deinitDataSources();
        // TODO: add deinit on opened pages
        super.deinit();
    }
    addDatabase(database) {
        this.databases.push(database);
    }
    async logout() {
        const data = await this.request({
            action: 'logout',
        });
        this.emit('logout', { source: this });
    }
    async request(options) {
        // console.warn('Application.request', data);
        const start = Date.now();
        const [headers, body] = await common_1.FrontHostApp.doHttpRequest2(options);
        if (!headers['qforms-platform-version'])
            throw new Error('no qforms-platform-version header');
        if (!headers['qforms-app-version'])
            throw new Error('no qforms-app-version header');
        this.emit('request', {
            time: Date.now() - start,
            remotePlatformVersion: headers['qforms-platform-version'],
            remoteAppVersion: headers['qforms-app-version'],
        });
        return body;
    }
    getDatabase(name) {
        // console.log('Application.getDatabase', name);
        const database = this.databases.find((database) => database.getName() === name);
        if (!database)
            throw new Error(`no database: ${name}`);
        return database;
    }
    getText() {
        return this.data.text;
    }
    getUser() {
        return this.data.user;
    }
    getDomain() {
        return this.getAttr('domain');
    }
    getVirtualPath() {
        return this.data.virtualPath;
    }
    async rpc(name, params) {
        console.log('Application.rpc', this.getFullName(), name, params);
        if (!name)
            throw new Error('no name');
        const response = await this.request({
            uuid: this.getAttr('uuid'),
            action: 'rpc',
            name: name,
            params: params,
        });
        if (response.errorMessage)
            throw new Error(response.errorMessage);
        return response;
    }
    emitResult(result, source = null) {
        console.log('Application.emitResult', result, source);
        const promises = [];
        for (const database in result) {
            promises.push(...this.getDatabase(database).emitResult(result[database], source));
        }
        // console.log('promises:', promises);
        // @ts-ignore
        return Promise.allSettled(promises);
    }
    getNodeEnv() {
        return this.data.nodeEnv;
    }
    isDevelopment() {
        return this.getNodeEnv() === 'development';
    }
}
exports.Application = Application;
Helper_1.Helper.registerGlobalClass(Application);