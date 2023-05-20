import { Express, Request, Response } from 'express';
import { Context } from './Context';
import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
import { AppInfo } from './AppInfo';
import { MonitorModule } from './monitor/MonitorModule';
import { IndexModule } from './index/IndexModule';
import { ViewerModule } from './viewer/ViewerModule';
import { EditorModule } from './editor/EditorModule';
import { Result } from '../Result';
import { QueryParams } from '../types';
export declare class BackHostApp {
    private params;
    applications: any;
    express: Express;
    httpServer: any;
    wsServer: any;
    appsDirPath: string;
    distDirPath: string;
    frontendDirPath: string;
    runtimeDirPath: string;
    sessionDirPath: string;
    logPool: any;
    indexModule: IndexModule;
    monitorModule: MonitorModule;
    viewerModule: ViewerModule;
    editorModule: EditorModule;
    startTime: Date;
    logErrorUrl: string;
    createAppQueue: any;
    constructor(params?: any);
    checkVersion(): void;
    run(): Promise<number>;
    initProcess(): void;
    getSecretSync(): any;
    initExpressServer(): void;
    createApplicationIfNotExists(context: Context): Promise<any>;
    getApplication(context: Context): BkApplication;
    getApplicationByRoute(route: string): BkApplication;
    getAppFilePath(context: Context): string;
    createApplication(context: Context): Promise<BkApplication>;
    getApplicationClass(appInfo: AppInfo): typeof BkApplication;
    createApp(req: any): Promise<AppInfo[]>;
    logError(err: Error, req?: Request | null): Promise<void>;
    logRequest(req: any, context: Context, time: any): Promise<void>;
    logEvent(context: Context, message: string, data?: any): Promise<void>;
    static createLog(cnn: any, values: any): Promise<void>;
    createLog2(values: any): Promise<void>;
    moduleGet(req: Request, res: Response, next: any): Promise<void>;
    indexGet(req: Request, res: Response, next: any): Promise<void>;
    indexPost(req: any, res: any, next: any): Promise<void>;
    monitorGet(req: any, res: any, next: any): Promise<void>;
    modulePost(req: Request, res: Response, next: any): Promise<void>;
    moduleGetFile(req: Request, res: Response, next: any): Promise<void>;
    _e404(req: any, res: any, next: any): Promise<void>;
    _e500(err: any, req: any, res: any, next: any): Promise<void>;
    createAndRunHttpServer(host: any, port: any): Promise<any>;
    onProcessMessage(message: any): Promise<void>;
    onProcessSIGINT(): Promise<void>;
    onProcessSIGTERM(): void;
    onProcessExit(code: any): void;
    onUnhandledRejection(err: any): Promise<void>;
    shutdown(): Promise<void>;
    onHttpServerError(err: any): void;
    getDomainFromRequest(req: any): string | null;
    postError(req: any, res: any, next: any): Promise<void>;
    getFrontendDirPath(): string;
    initCustomRoutes(): void;
    alias(method: string, path: string, [module, appDirName, appFileName, env, domain]: [
        module: string,
        appDirName: string,
        appFileName: string,
        env: string,
        domain?: string
    ], cb: string, query?: QueryParams): void;
    getPostAlias(path: string, arr: [
        module: string,
        appDirName: string,
        appFileName: string,
        env: string,
        domain?: string
    ], query?: QueryParams): void;
    getNodeEnv(): string;
    isDevelopment(): boolean;
    isProduction(): boolean;
    getParams(): any;
    broadcastResult(sourceApplication: BkApplication, context: Context, result: Result): void;
    static test(): void;
    getDistDirPath(): string;
    makeDistDirPathForApp(appFilePath: string): string;
}
