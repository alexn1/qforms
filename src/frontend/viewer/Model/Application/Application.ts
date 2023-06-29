import { Model } from '../Model';
import { Database } from '../Database/Database';
import { FrontHostApp } from '../../../common';
import { DataSource } from '../../Model/DataSource/DataSource';
import { Result } from '../../../../Result';
import { Helper } from '../../../common/Helper';
import { ApplicationData } from '../../../../data';

export class Application extends Model<ApplicationData> {
    databases: Database[] = [];
    dataSources: DataSource[] = [];

    constructor(data: ApplicationData) {
        super(data, null);
    }

    init() {
        // console.log('Application.init');
        if (!this.data.theme) throw new Error('no theme attr');

        // databases
        this.createDatabases();

        // data sources
        this.createDataSources();
    }

    createDatabases() {
        for (const data of this.data.databases) {
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
        const data = await this.request({
            action: 'logout',
        });
        this.emit('logout', { source: this });
    }

    async request(options) {
        // console.warn('Application.request', data);
        const start = Date.now();
        const [headers, body] = await FrontHostApp.doHttpRequest2(options);
        if (!headers['qforms-platform-version'])
            throw new Error('no qforms-platform-version header');
        if (!headers['qforms-app-version']) throw new Error('no qforms-app-version header');
        this.emit('request', {
            time: Date.now() - start,
            remotePlatformVersion: headers['qforms-platform-version'],
            remoteAppVersion: headers['qforms-app-version'],
        });
        return body;
    }

    getDatabase(name: string) {
        // console.log('Application.getDatabase', name);
        const database = this.databases.find((database) => database.getName() === name);
        if (!database) throw new Error(`no database: ${name}`);
        return database;
    }

    getText() {
        return this.data.text;
    }

    getUser() {
        return this.data.user;
    }

    getDomain() {
        return this.getAttr('domain');
    }

    getVirtualPath() {
        return this.data.virtualPath;
    }

    async rpc(name: string, params: { [name: string]: any }) {
        console.log('Application.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const response = await this.request({
            uuid: this.getAttr('uuid'),
            action: 'rpc',
            name: name,
            params: params,
        });
        if (response.errorMessage) throw new Error(response.errorMessage);
        return response;
    }

    emitResult(result: Result, source = null) {
        console.log('Application.emitResult', result, source);
        const promises = [];
        for (const database in result) {
            promises.push(...this.getDatabase(database).emitResult(result[database], source));
        }
        // console.log('promises:', promises);
        // @ts-ignore
        return Promise.allSettled(promises);
    }

    getNodeEnv(): string {
        return this.data.nodeEnv;
    }

    isDevelopment(): boolean {
        return this.getNodeEnv() === 'development';
    }

    getRoute(): string {
        return this.getAttr('route');
    }
}

Helper.registerGlobalClass(Application);
