/// <reference types="node" />
import http from 'http';
import { Express, Request, Response } from 'express';
import { WebSocketServer } from './WebSocketServer';
import { Context } from './Context';
import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
import { AppInfo } from './AppInfo';
import { MonitorModule } from './monitor/MonitorModule';
import { IndexModule } from './index/IndexModule';
import { ViewerModule } from './viewer/ViewerModule';
import { EditorModule } from './editor/EditorModule';
import { Result } from '../Result';
import { QueryParams } from '../types';
import { EventLog, EventLogOptions } from './EventLog';
import { EmptyPromise } from './EmptyPromise';
export interface BackHostAppParams {
    [name: string]: any;
    appsDirPath?: string;
    distDirPath?: string;
    runtimeDirPath?: string;
    handleException?: boolean;
    host?: string;
    port?: number;
    logger?: EventLogOptions;
    monitor?: {
        username: string;
        password: string;
    };
}
export declare class BackHostApp {
    private params;
    applications: {
        [route: string]: BkApplication;
    };
    express: Express;
    httpServer: http.Server;
    wsServer: WebSocketServer;
    appsDirPath: string;
    distDirPath: string;
    frontendDirPath: string;
    runtimeDirPath: string;
    sessionDirPath: string;
    indexModule: IndexModule;
    monitorModule: MonitorModule;
    viewerModule: ViewerModule;
    editorModule: EditorModule;
    startTime: Date;
    createAppQueue: {
        [route: string]: EmptyPromise[];
    };
    private eventLog;
    constructor(params?: BackHostAppParams);
    run(): Promise<void>;
    getHost(): string;
    getPort(): number;
    initHttpServer(): Promise<void>;
    checkNodeVersion(): void;
    checkApplicationFolder(): void;
    createDirsIfNotExistsSync(): void;
    private createEventLog;
    initModules(): Promise<void>;
    initWebSocketServer(): void;
    initDirPaths(): void;
    composeStartMessage(host: string, port: string | number): string;
    listenProcessEvents(): void;
    getSecretSync(): any;
    initExpressServer(): void;
    createApplicationIfNotExists(context: Context): Promise<any>;
    getApplication(context: Context): BkApplication;
    getApplicationByRoute(route: string): BkApplication;
    getAppFilePath(context: Context): string;
    createApplication(context: Context): Promise<BkApplication>;
    getApplicationClass(appInfo: AppInfo): typeof BkApplication;
    createApp(req: any): Promise<AppInfo[]>;
    composeContextData(err: Error, req: Request): {
        headers: any;
        method: string;
        host: any;
        originalUrl: string;
        uri: string;
        platformVersion: any;
        appVersion: string;
        route: string;
        body: any;
        status: number;
        data: object;
    };
    logError(err: Error, req?: Request): Promise<void>;
    logEvent(context: Context, message: string, data?: object): Promise<void>;
    moduleGet(req: Request, res: Response, next: any): Promise<void>;
    indexGet(req: Request, res: Response, next: any): Promise<void>;
    indexPost(req: any, res: any, next: any): Promise<void>;
    monitorGet(req: any, res: any, next: any): Promise<void>;
    modulePost(req: Request, res: Response, next: any): Promise<void>;
    moduleGetFile(req: Request, res: Response, next: any): Promise<void>;
    _e404(req: any, res: any, next: any): Promise<void>;
    _e500(err: any, req: any, res: any, next: any): Promise<void>;
    createAndRunHttpServer(host: string, port: number): Promise<http.Server>;
    onProcessMessage(message: string): Promise<void>;
    onProcessSIGINT(): Promise<void>;
    onProcessSIGTERM(): void;
    onProcessExit(code: number): void;
    onUnhandledRejection(err: any): Promise<void>;
    shutdown(): Promise<void>;
    onHttpServerError(err: any): void;
    getDomainFromRequest(req: any): string | null;
    postError(req: Request, res: Response, next: (err?: Error) => void): Promise<void>;
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
    getParams(): BackHostAppParams;
    broadcastResult(sourceApplication: BkApplication, context: Context, result: Result): void;
    static test(): void;
    getDistDirPath(): string;
    makeDistDirPathForApp(appFilePath: string): string;
    getLogger(): EventLog;
}
