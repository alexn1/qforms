"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkMongoDbDatabase = void 0;
const mongodb_1 = require("mongodb");
const BkNoSqlDatabase_1 = require("../BkNoSqlDatabase");
class BkMongoDbDatabase extends BkNoSqlDatabase_1.BkNoSqlDatabase {
    async connect(context) {
        console.log('MongoDbDatabase.connect', this.getName());
        if (!context)
            throw new Error('no context');
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }
        const url = this.getUrl();
        const client = new mongodb_1.MongoClient(url);
        console.log(`MongoDbDatabase: connecting to ${url}`);
        await client.connect();
        const session = client.startSession();
        context.connections[name] = { client, session };
    }
    getUrl() {
        // console.log('config', this.getConfig());
        const { host, user, password } = this.getConfig();
        const userPassword = user && password ? `${user}:${password}@` : '';
        const host2 = process.env.DB_HOST || host;
        return `mongodb://${userPassword}${host2}:${this.getDefaultPort()}`;
    }
    async release(context) {
        console.log('MongoDbDatabase.release', this.getName());
        if (!context)
            throw new Error('no context');
        const { client, session } = this.getConnection(context);
        session.endSession();
        await client.close();
        context.connections[this.getName()] = null;
    }
    async updateOne(context, colName, filter, update) {
        const _filter = Object.keys(filter).reduce((acc, name) => {
            acc[name] = name === '_id' ? new mongodb_1.ObjectId(filter[name]) : filter[name];
            return acc;
        }, {});
        console.log('colName', colName);
        console.log('_filter:', _filter);
        console.log('update', update);
        return await this.getDbLink(context).collection(colName).updateOne(_filter, update);
    }
    async insertOne(context, colName, document) {
        return await this.getDbLink(context).collection(colName).insertOne(document);
    }
    async deleteOne(context, colName, filter) {
        const _filter = BkMongoDbDatabase.makeObjectIds(filter);
        // console.log('_filter', _filter);
        return await this.getDbLink(context).collection(colName).deleteOne(_filter);
    }
    static makeObjectIds(filter, names = ['_id']) {
        return Object.keys(filter).reduce((acc, name) => {
            acc[name] = names.includes(name) ? new mongodb_1.ObjectId(filter[name]) : filter[name];
            return acc;
        }, {});
    }
    getDbLink(context) {
        const client = this.getConnection(context).client;
        const { database } = this.getConfig();
        return client.db(database);
    }
    async queryResult(context, query, params = null) {
        const db = this.getDbLink(context);
        // eval query as function
        const fn = query.trim().substring(0, 5) === 'async'
            ? eval(query)
            : eval(`(db, params, ObjectId) => (${query})`);
        // exec query
        const result = await fn(db, params, mongodb_1.ObjectId);
        return result;
    }
    async queryRows(context, query, params = null) {
        console.log('MongoDbDatabase.query', query, params);
        const result = await this.queryResult(context, query, params);
        // for find() and aggregate()
        if (result instanceof mongodb_1.FindCursor || result instanceof mongodb_1.AggregationCursor) {
            return await result.toArray();
        }
        // for findOne query
        return [result];
    }
    async queryScalar(context, query, params = null) {
        const rows = await this.queryRows(context, query, params);
        // console.log('rows:', rows);
        const [firstRow] = rows;
        if (!firstRow)
            throw new Error('queryScalar: no first row');
        // console.log('firstRow:', firstRow);
        const firstField = Object.keys(firstRow)[0];
        if (!firstField)
            throw new Error('queryScalar: no first field');
        return firstRow[firstField];
    }
    getDefaultPort() {
        return 27017;
    }
    async begin(context) {
        console.log('MongoDbDatabase.begin');
        this.getConnection(context).session.startTransaction();
    }
    async commit(context) {
        console.log('MongoDbDatabase.commit');
        this.getConnection(context).session.commitTransaction();
    }
    async rollback(context, err) {
        console.log('MongoDbDatabase.rollback');
        this.getConnection(context).session.abortTransaction();
    }
    async deinit() {
        console.log(`MongoDbDatabase.deinit: ${this.getName()}`);
    }
}
exports.BkMongoDbDatabase = BkMongoDbDatabase;
