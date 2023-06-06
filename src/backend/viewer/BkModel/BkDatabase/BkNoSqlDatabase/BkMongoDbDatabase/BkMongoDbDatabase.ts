import { MongoClient, FindCursor, AggregationCursor, ObjectId, ClientSession, Db } from 'mongodb';
import { BkNoSqlDatabase } from '../BkNoSqlDatabase';
import { Context } from '../../../../../Context';
import { Row } from '../../../../../../types';

export class BkMongoDbDatabase extends BkNoSqlDatabase<{
    client: MongoClient;
    session: ClientSession;
}> {
    async connect(context: Context): Promise<void> {
        console.log('MongoDbDatabase.connect', this.getName());
        if (!context) throw new Error('no context');
        this.checkDeinited();
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
        const { host, user, password, port } = this.getConfig();
        const userPassword = user && password ? `${user}:${password}@` : '';
        const host2 = process.env.DB_HOST || host;
        return `mongodb://${userPassword}${host2}:${port || this.getDefaultPort()}`;
    }

    async release(context: Context): Promise<void> {
        console.log('MongoDbDatabase.release', this.getName());
        if (!context) throw new Error('no context');
        const { client, session } = this.getConnection(context);
        session.endSession();
        await client.close();
        context.connections[this.getName()] = null;
    }

    async updateOne(context: Context, colName: string, filter: any, update: any): Promise<any> {
        const _filter = Object.keys(filter).reduce((acc, name) => {
            acc[name] = name === '_id' ? new ObjectId(filter[name]) : filter[name];
            return acc;
        }, {});
        console.log('colName', colName);
        console.log('_filter:', _filter);
        console.log('update', update);
        return await this.getDbLink(context).collection(colName).updateOne(_filter, update);
    }

    async insertOne(context: Context, colName: string, document: any): Promise<any> {
        return await this.getDbLink(context).collection(colName).insertOne(document);
    }

    async deleteOne(context: Context, colName: string, filter): Promise<any> {
        const _filter = BkMongoDbDatabase.makeObjectIds(filter);
        // console.log('_filter', _filter);
        return await this.getDbLink(context).collection(colName).deleteOne(_filter);
    }

    static makeObjectIds(filter: any, names: string[] = ['_id']): any {
        return Object.keys(filter).reduce((acc, name) => {
            acc[name] = names.includes(name) ? new ObjectId(filter[name]) : filter[name];
            return acc;
        }, {});
    }

    private getDbLink(context: Context): Db {
        const client = this.getConnection(context).client;
        const { database } = this.getConfig();
        return client.db(database);
    }

    async queryResult(
        context: Context,
        query: string,
        params: { [name: string]: any } = null,
    ): Promise<any> {
        const db = this.getDbLink(context);

        // eval query as function
        const fn =
            query.trim().substring(0, 5) === 'async'
                ? eval(query)
                : eval(`(db, params, ObjectId) => (${query})`);

        // exec query
        const result = await fn(db, params, ObjectId);
        return result;
    }

    async queryRows(
        context: Context,
        query: string,
        params: { [name: string]: any } = null,
    ): Promise<Row[]> {
        console.log('MongoDbDatabase.query', query, params);
        const result = await this.queryResult(context, query, params);

        // for find() and aggregate()
        if (result instanceof FindCursor || result instanceof AggregationCursor) {
            return await result.toArray();
        }

        // for findOne query
        return [result];
    }

    async queryScalar(
        context: Context,
        query: string,
        params: { [name: string]: any } = null,
    ): Promise<any> {
        const result = await this.queryResult(context, query, params);

        // for find() and aggregate()
        if (result instanceof FindCursor || result instanceof AggregationCursor) {
            const rows = await result.toArray();
            // console.log('rows:', rows);
            const [firstRow] = rows;
            if (!firstRow) throw new Error('queryScalar: no first row');
            // console.log('firstRow:', firstRow);
            const firstField = Object.keys(firstRow)[0];
            if (!firstField) throw new Error('queryScalar: no first field');
            return firstRow[firstField];
        }

        return result;
    }

    getDefaultPort(): number {
        return 27017;
    }

    async begin(context: Context): Promise<void> {
        console.log('MongoDbDatabase.begin');
        this.getConnection(context).session.startTransaction();
    }

    async commit(context: Context): Promise<void> {
        console.log('MongoDbDatabase.commit');
        this.getConnection(context).session.commitTransaction();
    }

    async rollback(context: Context, err): Promise<void> {
        console.log('MongoDbDatabase.rollback');
        this.getConnection(context).session.abortTransaction();
    }
}
