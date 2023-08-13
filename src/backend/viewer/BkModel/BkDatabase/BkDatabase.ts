import { BkModel } from '../BkModel';
import { BkParam } from '../BkParam/BkParam';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkTable } from '../BkTable/BkTable';
import { Context } from '../../../Context';
import { Row } from '../../../../types';
import { BkDatabaseScheme } from '../../BkModelScheme/BkDatabaseScheme/BkDatabaseScheme';

export interface DbConfig {
    host: string;
    database: string;
    user: string;
    password: string;
    port?: number;
}

export class BkDatabase<TConnection = any> extends BkModel<BkDatabaseScheme> {
    tables: BkTable[] = [];
    params: BkParam[] = [];
    fillCollections = ['tables'];

    /* constructor(data, parent?) {
        //debug('Database.constructor');
        super(data, parent);
    } */

    async init(context: Context): Promise<void> {
        await this.createColItems('tables', context);
        await this.createColItems('params', context);
    }

    fillAttributes(response: any): void {
        response.name = this.getAttr('name');
    }

    async connect(context: Context): Promise<void> {
        throw new Error(`${this.constructor.name}.connect not implemented`);
    }

    isConnected(context: Context) {
        return !!context.connections[this.getName()];
    }

    getConnection(context: Context): TConnection {
        // debug('Database.getConnection');
        if (!context) throw new Error('no context');
        const name = this.getName();
        if (!context.connections[name]) {
            throw new Error(`not connected: ${name}`);
        }
        return context.connections[name];
    }

    async release(context: Context): Promise<void> {
        throw new Error(`${this.constructor.name}.release not implemented`);
    }

    async queryResult(
        context: Context,
        query: string,
        params: { [name: string]: any } | null = null,
    ): Promise<any> {
        throw new Error(`${this.constructor.name}.queryResult not implemented`);
    }

    async queryRows(
        context: Context,
        query: string,
        params: { [name: string]: any } | null = null,
    ): Promise<Row[]> {
        throw new Error(`${this.constructor.name}.queryRows not implemented`);
    }

    async queryScalar(
        context: Context,
        query: string,
        params: { [name: string]: any } | null = null,
    ): Promise<any> {
        throw new Error(`${this.constructor.name}.queryScalar not implemented`);
    }

    async begin(context: Context): Promise<void> {
        throw new Error(`${this.constructor.name}.begin not implemented`);
    }

    async commit(context: Context): Promise<void> {
        throw new Error(`${this.constructor.name}.commit not implemented`);
    }

    async rollback(context: Context, err): Promise<void> {
        throw new Error(`${this.constructor.name}.rollback not implemented`);
    }

    getDatabaseName(context?: Context): string {
        return this.getParam('database').getValue();
    }

    getConfig(context?: Context): DbConfig {
        const config: DbConfig = {
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

    getDefaultPort(): number {
        throw new Error(`${this.constructor.name}.getDefaultPort not implemented`);
    }

    getApp(): BkApplication {
        return this.getParent();
    }

    findTable(name: string): BkTable | undefined {
        return this.tables.find((table) => table.getName() === name);
    }

    findParam(name: string): BkParam | undefined {
        return this.params.find((param) => param.getName() === name);
    }

    getTable(name: string): BkTable {
        if (!name) throw new Error('getTable: no name');
        const table = this.findTable(name);
        if (!table) throw new Error(`no table with name: ${name}`);
        return table;
    }

    getParam(name: string): BkParam {
        if (!name) throw new Error('getParam: no name');
        const param = this.findParam(name);
        if (!param) throw new Error(`no param with name: ${name}`);
        return param;
    }

    async insertRow(
        context: Context,
        table: string,
        values: any,
        autoColumnTypes: any = {},
    ): Promise<Row> {
        throw new Error(`${this.constructor.name}.insertRow not implemented`);
    }

    async getTableList(): Promise<string[]> {
        throw new Error(`${this.constructor.name}.getTableList not implemented`);
    }

    async getTableInfo(table: string): Promise<any[]> {
        throw new Error(`${this.constructor.name}.getTableInfo not implemented`);
    }

    async transaction<TResult = any>(
        context: Context,
        cb: () => Promise<TResult>,
    ): Promise<TResult> {
        await this.begin(context);
        try {
            const result = await cb();
            await this.commit(context);
            return result;
        } catch (err) {
            await this.rollback(context, err);
            throw err;
        }
    }

    async use<TResult = any>(
        context: Context,
        cb: (db: BkDatabase) => Promise<TResult>,
    ): Promise<TResult> {
        await this.connect(context);
        try {
            return await cb(this);
        } finally {
            await this.release(context);
        }
    }
}
