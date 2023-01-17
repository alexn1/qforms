import { MongoClient } from 'mongodb';
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

        /* const db = client.db(database);
        const collection = db.collection('MyCollection');
        const findResult = await collection.find({}).toArray();
        console.log(typeof findResult);
        console.log('findResult:', findResult); */
    }

    async release(context: Context): Promise<void> {
        console.log('MongoDbDatabase.release', this.getName());
        if (!context) throw new Error('no context');
        const client = this.getConnection(context);
        await client.close();
        context.connections[this.getName()] = null;
    }

    async collectionFind(context: Context, collectionName: string): Promise<any> {
        const client = this.getConnection(context);
        const { database } = this.getConfig();
        const db = client.db(database);
        const collection = db.collection(collectionName);
        const result = await collection.find().toArray();
        return result;
    }
}
