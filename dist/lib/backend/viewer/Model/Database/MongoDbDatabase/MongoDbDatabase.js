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
        // console.log('config', this.getConfig());
        const { host, database, user, password } = this.getConfig();
        const client = new mongodb_1.MongoClient(`mongodb://${user}:${password}@${host}:${this.getPort()}`);
        await client.connect();
        context.connections[name] = client;
    }
    async release(context) {
        console.log('MongoDbDatabase.release', this.getName());
        if (!context)
            throw new Error('no context');
        const client = this.getConnection(context);
        await client.close();
        context.connections[this.getName()] = null;
    }
    async query(context, query, params) {
        console.log('MongoDbDatabase.query', query, params);
        const client = this.getConnection(context);
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
}
exports.MongoDbDatabase = MongoDbDatabase;