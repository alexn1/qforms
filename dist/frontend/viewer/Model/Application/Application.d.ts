import { Model } from '../Model';
import { Database } from '../Database/Database';
import { DataSource } from '../../Model/DataSource/DataSource';
import { Result } from '../../../../Result';
import { ApplicationData } from '../../../../data';
export declare class Application extends Model<ApplicationData> {
    databases: Database[];
    dataSources: DataSource[];
    constructor(data: ApplicationData);
    init(): void;
    createDatabases(): void;
    deinit(): void;
    addDatabase(database: Database): void;
    logout(): Promise<void>;
    request(options: any): Promise<any>;
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
    rpc(name: string, params: {
        [name: string]: any;
    }): Promise<any>;
    emitResult(result: Result, source?: any): any;
    getNodeEnv(): string | null;
    isDevelopment(): boolean;
    getRoute(): string;
}
