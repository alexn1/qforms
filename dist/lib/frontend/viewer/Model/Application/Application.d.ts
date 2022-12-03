import { Model } from '../Model';
export declare class Application extends Model {
    databases: any[];
    dataSources: any[];
    constructor(data: any);
    init(): void;
    deinit(): void;
    addDatabase(database: any): void;
    logout(): Promise<void>;
    request(options: any): Promise<any>;
    getDatabase(name: any): any;
    getText(): any;
    getUser(): any;
    getDomain(): any;
    getVirtualPath(): any;
    rpc(name: any, params: any): Promise<any>;
    emitResult(result: any, source?: any): any;
    getNodeEnv(): any;
    isDevelopment(): boolean;
}
