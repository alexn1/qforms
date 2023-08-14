import { Model } from '../Model';
import { Database } from '../Database/Database';
import { RequestBody, RequestMethod } from '../../../common';
import { DataSource } from '../../Model/DataSource/DataSource';
import { Result } from '../../../../Result';
import { ApplicationData } from '../../../../common/data';
export declare class Application extends Model<ApplicationData> {
    databases: Database[];
    dataSources: DataSource[];
    constructor(data: ApplicationData);
    init(): void;
    createDatabases(): void;
    deinit(): void;
    addDatabase(database: Database): void;
    logout(): Promise<void>;
    request(method: RequestMethod, body: RequestBody): Promise<any>;
    findDatabase(name: string): Database | undefined;
    getDatabase(name: string): Database;
    getText(): any;
    getUser(): {
        [name: string]: any;
        id: number;
        login: string;
    };
    getDomain(): any;
    getVirtualPath(): string;
    rpc(name: string, params: Record<string, any>): Promise<any>;
    emitResult(result: Result, source?: any): any;
    getNodeEnv(): string | null;
    isDevelopment(): boolean;
    getRoute(): string;
}
