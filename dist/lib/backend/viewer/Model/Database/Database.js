"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const Model_1 = require("../Model");
const Param_1 = require("../Param/Param");
class Database extends Model_1.Model {
    constructor() {
        super(...arguments);
        this.tables = [];
        this.fillCollections = ['tables'];
    }
    /* constructor(data, parent?) {
        //console.log('Database.constructor');
        super(data, parent);
    } */
    async init(context) {
        await this.createColItems('tables', context);
    }
    async deinit() {
        throw new Error(`${this.constructor.name}.deinit not implemented`);
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
    createParam(name) {
        return new Param_1.Param(this.getColItemData('params', name), this);
    }
    getConfig() {
        const config = {
            host: this.createParam('host').getValue(),
            database: this.createParam('database').getValue(),
            user: this.createParam('user').getValue(),
            password: this.createParam('password').getValue(),
        };
        if (this.isData('params', 'port')) {
            config.port = this.createParam('port').getValue();
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
    getTable(name) {
        if (!name)
            throw new Error('getTable: no name');
        const table = this.findTable(name);
        if (!table)
            throw new Error(`no table with name: ${name}`);
        return table;
        // if (!this.tables[name]) throw new Error(`no table with name: ${name}`);
        // return this.tables[name];
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
}
exports.Database = Database;
