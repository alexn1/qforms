import { MongoClient, FindCursor, AggregationCursor, ObjectId, ClientSession, Db } from 'mongodb';
import { BkNoSqlDatabase } from '../BkNoSqlDatabase';
import { Context } from '../../../../../Context';
import { Row } from '../../../../../../types';
import { debug } from '../../../../../../console';

export class BkMongoDbDatabase extends BkNoSqlDatabase<{
    client: MongoClient;
    session: ClientSession;
}> {
    async connect(context: Context): Promise<void> {
        debug('MongoDbDatabase.connect', this.getName());
        if (!context) throw new Error('no context');
        this.checkDeinited();
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }

        const url = this.getUrl(context);
        const client = new MongoClient(url);
        debug(`MongoDbDatabase: connecting to ${url}`);
        await client.connect();
        const session = client.startSession();
        context.connections[name] = { client, session };
    }

    getUrl(context: Context) {
        // debug('config', this.getConfig());
        const { host, user, password, port } = this.getConfig(context);
        const userPassword = user && password ? `${user}:${password}@` : '';
        const host2 = process.env.DB_HOST || host;
        return `mongodb://${userPassword}${host2}:${
            port || this.getDefaultPort()
        }/?directConnection=true`;
    }

    async release(context: Context): Promise<void> {
        debug('MongoDbDatabase.release', this.getName());
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
        debug('colName', colName);
        debug('_filter:', _filter);
        debug('update', update);
        return await this.getDbLink(context).collection(colName).updateOne(_filter, update);
    }

    async insertOne(context: Context, colName: string, document: any): Promise<any> {
        return await this.getDbLink(context).collection(colName).insertOne(document);
    }

    async deleteOne(context: Context, colName: string, filter): Promise<any> {
        const _filter = BkMongoDbDatabase.makeObjectIds(filter);
        // debug('_filter', _filter);
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
        const { database } = this.getConfig(context);
        return client.db(database);
    }

    async queryResult(
        context: Context,
        query: string,
        params: { [name: string]: any } | null = null,
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
        params: { [name: string]: any } | null = null,
    ): Promise<Row[]> {
        debug('MongoDbDatabase.query', query, params);
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
        params: { [name: string]: any } | null = null,
    ): Promise<any> {
        const result = await this.queryResult(context, query, params);

        // for find() and aggregate()
        if (result instanceof FindCursor || result instanceof AggregationCursor) {
            const rows = await result.toArray();
            // debug('rows:', rows);
            const [firstRow] = rows;
            if (!firstRow) throw new Error('queryScalar: no first row');
            // debug('firstRow:', firstRow);
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
        debug('MongoDbDatabase.begin');
        this.getConnection(context).session.startTransaction();
    }

    async commit(context: Context): Promise<void> {
        debug('MongoDbDatabase.commit');
        this.getConnection(context).session.commitTransaction();
    }

    async rollback(context: Context, err): Promise<void> {
        debug('MongoDbDatabase.rollback');
        this.getConnection(context).session.abortTransaction();
    }
}
