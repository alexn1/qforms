import { RpcActionDto } from '../../../../types';
import { Model } from '../Model';
import { Database } from '../Database/Database';
import { FrontHostApp, RequestMethod } from '../../../common';
import { DataSource } from '../../Model/DataSource/DataSource';
import { Result } from '../../../../Result';
import { Helper } from '../../../common/Helper';
import { ApplicationData } from '../../../../common/ModelData/ApplicationData';

export class Application extends Model<ApplicationData> {
    databases: Database[] = [];
    dataSources: DataSource[] = [];

    constructor(data: ApplicationData) {
        super(data);
    }

    init() {
        // console.debug('Application.init');
        if (!this.getData().theme) throw new Error('no theme attr');

        // databases
        this.createDatabases();

        // data sources
        this.createDataSources();
    }

    createDatabases() {
        for (const data of this.getData().databases) {
            const database = new Database(data, this);
            database.init();
            this.addDatabase(database);
        }
    }

    deinit() {
        this.deinitDataSources();
        // TODO: add deinit on opened pages
        super.deinit();
    }

    addDatabase(database: Database) {
        this.databases.push(database);
    }

    async logout() {
        const data = await this.request('POST', {
            action: 'logout',
        });
        this.emit('logout', { source: this });
    }

    async request(method: RequestMethod, body: any) {
        // console.warn('Application.request', data);
        const start = Date.now();
        const [headers, data] = await FrontHostApp.doHttpRequest2(method, body);
        if (!headers['qforms-platform-version'])
            throw new Error('no qforms-platform-version header');
        // if (!headers['qforms-app-version']) throw new Error('no qforms-app-version header');
        this.emit('request', {
            time: Date.now() - start,
            remotePlatformVersion: headers['qforms-platform-version'],
            remoteAppVersion: headers['qforms-app-version'] || null,
        });
        return data;
    }

    findDatabase(name: string): Database | undefined {
        return this.databases.find((database) => database.getName() === name);
    }

    getDatabase(name: string): Database {
        // console.debug('Application.getDatabase', name);
        const database = this.findDatabase(name);
        if (!database) throw new Error(`no database: ${name}`);
        return database;
    }

    getText() {
        return this.getData().text;
    }

    getUser() {
        return this.getData().user;
    }

    getDomain() {
        return this.getAttr('domain');
    }

    getVirtualPath() {
        return this.getData().virtualPath;
    }

    async rpc(name: string, params: Record<string, any>) {
        console.debug('Application.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const body: RpcActionDto = {
            action: 'rpc',
            name: name,
            uuid: this.getAttr('uuid'),
            params: params,
        };
        const response = await this.request('POST', body);
        if (response.errorMessage) throw new Error(response.errorMessage);
        return response;
    }

    emitResult(result: Result, source?: any) {
        console.debug('Application.emitResult', result, source);
        const promises: any[] = [];
        for (const database in result) {
            promises.push(...this.getDatabase(database).emitResult(result[database], source));
        }
        // console.debug('promises:', promises);
        // @ts-ignore
        return Promise.allSettled(promises);
    }

    getNodeEnv(): string | null {
        return this.getData().nodeEnv;
    }

    isDevelopment(): boolean {
        return this.getNodeEnv() === 'dev';
    }

    getRoute(): string {
        return this.getAttr('route');
    }
}

Helper.registerGlobalClass(Application);
