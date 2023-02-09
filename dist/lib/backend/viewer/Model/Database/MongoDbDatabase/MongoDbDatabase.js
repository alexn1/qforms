"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbDatabase = void 0;
const mongodb_1 = require("mongodb");
const Database_1 = require("../Database");
class MongoDbDatabase extends Database_1.Database {
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
        return `mongodb://${userPassword}${host2}:${this.getPort()}`;
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
    async query(context, query, params) {
        console.log('MongoDbDatabase.query', query, params);
        const client = this.getConnection(context).client;
        const { database } = this.getConfig();
        const db = client.db(database);
        // eval query as function
        const fn = eval(`(db, params, ObjectId) => (${query})`);
        // exec query
        const result = await fn(db, params, mongodb_1.ObjectId);
        // for find() and aggregate()
        if (result instanceof mongodb_1.FindCursor || result instanceof mongodb_1.AggregationCursor) {
            return await result.toArray();
        }
        // for findOne query
        return [result];
    }
    getPort() {
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
exports.MongoDbDatabase = MongoDbDatabase;
