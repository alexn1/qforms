import { BkModel } from '../Model';
import { BkParam } from '../Param/Param';
import { BkApplication } from '../Application/Application';
import { BkTable } from '../Table/Table';
import { Context } from '../../../Context';
import { Row } from '../../../types';

interface Config {
    host: string;
    database: string;
    user: string;
    password: string;
    port?: number;
}

export class BkDatabase<TConnection = any> extends BkModel {
    tables: BkTable[] = [];
    fillCollections = ['tables'];

    /* constructor(data, parent?) {
        //console.log('Database.constructor');
        super(data, parent);
    } */

    async init(context: Context): Promise<void> {
        await this.createColItems('tables', context);
    }

    async deinit(): Promise<void> {
        throw new Error(`${this.constructor.name}.deinit not implemented`);
    }

    fillAttributes(response: any): void {
        response.name = this.getAttr('name');
    }

    async connect(context: Context): Promise<void> {
        throw new Error(`${this.constructor.name}.connect not implemented`);
    }

    getConnection(context: Context): TConnection {
        // console.log('Database.getConnection');
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

    async queryResult(context: Context, query: string, params: any = null): Promise<any> {
        throw new Error(`${this.constructor.name}.queryResult not implemented`);
    }

    async queryRows(context: Context, query: string, params: any = null): Promise<Row[]> {
        throw new Error(`${this.constructor.name}.queryRows not implemented`);
    }

    async queryScalar(context: Context, query: string, params: any = null): Promise<any> {
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

    createParam(name): BkParam {
        return new BkParam(this.getColItemData('params', name), this);
    }

    getConfig(): Config {
        const config: Config = {
            host: this.createParam('host').getValue(),
            database: this.createParam('database').getValue(),
            user: this.createParam('user').getValue(),
            password: this.createParam('password').getValue(),
        };
        if (this.isData('params', 'port')) {
            config.port = parseInt(this.createParam('port').getValue());
        }
        return config;
    }

    getDefaultPort(): number {
        throw new Error(`${this.constructor.name}.getDefaultPort not implemented`);
    }

    getApp(): BkApplication {
        return this.parent;
    }

    findTable(name: string): BkTable | undefined {
        return this.tables.find((table) => table.getName() === name);
    }

    getTable(name: string): BkTable {
        if (!name) throw new Error('getTable: no name');
        const table = this.findTable(name);
        if (!table) throw new Error(`no table with name: ${name}`);
        return table;
        // if (!this.tables[name]) throw new Error(`no table with name: ${name}`);
        // return this.tables[name];
    }

    async insertRow(context: Context, table: string, values: any, autoColumnTypes: any = {}) {
        throw new Error(`${this.constructor.name}.insertRow not implemented`);
    }
    async getTableList(): Promise<string[]> {
        throw new Error(`${this.constructor.name}.getTableList not implemented`);
    }
    async getTableInfo(table): Promise<any[]> {
        throw new Error(`${this.constructor.name}.getTableInfo not implemented`);
    }
}
