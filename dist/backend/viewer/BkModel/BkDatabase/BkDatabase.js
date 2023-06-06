"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkDatabase = void 0;
const BkModel_1 = require("../BkModel");
class BkDatabase extends BkModel_1.BkModel {
    constructor() {
        super(...arguments);
        this.tables = [];
        this.params = [];
        this.fillCollections = ['tables'];
    }
    /* constructor(data, parent?) {
        //console.log('Database.constructor');
        super(data, parent);
    } */
    async init(context) {
        await this.createColItems('tables', context);
        await this.createColItems('params', context);
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
    }
    async connect(context) {
        throw new Error(`${this.constructor.name}.connect not implemented`);
    }
    getConnection(context) {
        // console.log('Database.getConnection');
        if (!context)
            throw new Error('no context');
        const name = this.getName();
        if (!context.connections[name]) {
            throw new Error(`not connected: ${name}`);
        }
        return context.connections[name];
    }
    async release(context) {
        throw new Error(`${this.constructor.name}.release not implemented`);
    }
    async queryResult(context, query, params = null) {
        throw new Error(`${this.constructor.name}.queryResult not implemented`);
    }
    async queryRows(context, query, params = null) {
        throw new Error(`${this.constructor.name}.queryRows not implemented`);
    }
    async queryScalar(context, query, params = null) {
        throw new Error(`${this.constructor.name}.queryScalar not implemented`);
    }
    async begin(context) {
        throw new Error(`${this.constructor.name}.begin not implemented`);
    }
    async commit(context) {
        throw new Error(`${this.constructor.name}.commit not implemented`);
    }
    async rollback(context, err) {
        throw new Error(`${this.constructor.name}.rollback not implemented`);
    }
    getDatabaseName(context) {
        return this.getParam('database').getValue();
    }
    getConfig(context) {
        const config = {
            host: this.getParam('host').getValue(),
            database: this.getDatabaseName(context),
            user: this.getParam('user').getValue(),
            password: this.getParam('password').getValue(),
        };
        if (this.isData('params', 'port')) {
            config.port = this.getParam('port').getValue();
        }
        return config;
    }
    getDefaultPort() {
        throw new Error(`${this.constructor.name}.getDefaultPort not implemented`);
    }
    getApp() {
        return this.parent;
    }
    findTable(name) {
        return this.tables.find((table) => table.getName() === name);
    }
    findParam(name) {
        return this.params.find((param) => param.getName() === name);
    }
    getTable(name) {
        if (!name)
            throw new Error('getTable: no name');
        const table = this.findTable(name);
        if (!table)
            throw new Error(`no table with name: ${name}`);
        return table;
    }
    getParam(name) {
        if (!name)
            throw new Error('getParam: no name');
        const param = this.findParam(name);
        if (!param)
            throw new Error(`no param with name: ${name}`);
        return param;
    }
    async insertRow(context, table, values, autoColumnTypes = {}) {
        throw new Error(`${this.constructor.name}.insertRow not implemented`);
    }
    async getTableList() {
        throw new Error(`${this.constructor.name}.getTableList not implemented`);
    }
    async getTableInfo(table) {
        throw new Error(`${this.constructor.name}.getTableInfo not implemented`);
    }
    async useTransaction(context, cb) {
        await this.begin(context);
        try {
            await cb();
            await this.commit(context);
        }
        catch (err) {
            await this.rollback(context, err);
            throw err;
        }
    }
}
exports.BkDatabase = BkDatabase;
