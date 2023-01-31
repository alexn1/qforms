import { MongoClient, FindCursor, AggregationCursor } from 'mongodb';
import { Database } from '../Database';
import { Context } from '../../../../Context';

export class MongoDbDatabase extends Database {
    async connect(context: Context): Promise<void> {
        console.log('MongoDbDatabase.connect', this.getName());
        if (!context) throw new Error('no context');
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }

        // console.log('config', this.getConfig());
        const { host, database, user, password } = this.getConfig();
        const client = new MongoClient(`mongodb://${user}:${password}@${host}:27017`);
        await client.connect();
        context.connections[name] = client;
    }

    async release(context: Context): Promise<void> {
        console.log('MongoDbDatabase.release', this.getName());
        if (!context) throw new Error('no context');
        const client = this.getConnection(context);
        await client.close();
        context.connections[this.getName()] = null;
    }

    async query(context: Context, query: string): Promise<any[]> {
        console.log('MongoDbDatabase.query', query);
        const client = this.getConnection(context) as MongoClient;
        const { database } = this.getConfig();
        const db = client.db(database);

        // eval query as function
        const fn = eval(`(db) => (${query})`);

        // exec query
        const result = await fn(db);

        // for find() and aggregate()
        if (result instanceof FindCursor || result instanceof AggregationCursor) {
            return await result.toArray();
        }

        // for findOne query
        return [result];
    }
}
