import { MongoClient, FindCursor, AggregationCursor, ObjectId, ClientSession } from 'mongodb';
import { Database } from '../Database';
import { Context } from '../../../../Context';

interface IMongoDbDatabaseConnection {
    client: MongoClient;
    session: ClientSession;
}

export class MongoDbDatabase extends Database {
    async connect(context: Context): Promise<void> {
        console.log('MongoDbDatabase.connect', this.getName());
        if (!context) throw new Error('no context');
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }

        const url = this.getUrl();
        const client = new MongoClient(url);
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

    async release(context: Context): Promise<void> {
        console.log('MongoDbDatabase.release', this.getName());
        if (!context) throw new Error('no context');
        const { client, session } = this.getConnection(context) as IMongoDbDatabaseConnection;
        session.endSession();
        await client.close();
        context.connections[this.getName()] = null;
    }

    async query(context: Context, query: string, params: any): Promise<any[]> {
        console.log('MongoDbDatabase.query', query, params);
        const client = (this.getConnection(context) as IMongoDbDatabaseConnection).client;
        const { database } = this.getConfig();
        const db = client.db(database);

        // eval query as function
        const fn = eval(`(db, params, ObjectId) => (${query})`);

        // exec query
        const result = await fn(db, params, ObjectId);

        // for find() and aggregate()
        if (result instanceof FindCursor || result instanceof AggregationCursor) {
            return await result.toArray();
        }

        // for findOne query
        return [result];
    }

    getPort(): number {
        return 27017;
    }

    async begin(context: Context): Promise<void> {
        console.log('MongoDbDatabase.begin');
        (this.getConnection(context) as IMongoDbDatabaseConnection).session.startTransaction();
    }

    async commit(context: Context): Promise<void> {
        console.log('MongoDbDatabase.commit');
        (this.getConnection(context) as IMongoDbDatabaseConnection).session.commitTransaction();
    }

    async rollback(context: Context, err): Promise<void> {
        console.log('MongoDbDatabase.rollback');
        (this.getConnection(context) as IMongoDbDatabaseConnection).session.abortTransaction();
    }

    async deinit(): Promise<void> {
        console.log(`MongoDbDatabase.deinit: ${this.getName()}`);
    }
}
