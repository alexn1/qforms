/// <reference types="node" />
import http from 'http';
import { Express, NextFunction, Request, Response } from 'express';
import { WebSocketServer } from './WebSocketServer';
import { Context } from './Context';
import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
import { AppInfo } from './AppInfo';
import { MonitorModule } from './monitor/MonitorModule';
import { IndexModule } from './index/IndexModule';
import { ViewerModule } from './viewer/ViewerModule';
import { EditorModule } from './editor/EditorModule';
import { Result } from '../Result';
import { Optional, Scalar } from '../types';
import { EventLog, EventLogOptions } from './EventLog';
import { EmptyPromise } from './EmptyPromise';
import { Nullable } from '../types';
export type Route = [
    module: 'viewer' | 'editor',
    appDirName: string,
    appFileName: string,
    env: string,
    domain?: string
];
export interface BackHostAppParams {
    [name: string]: any;
    appsDirPath?: string;
    distDirPath?: string;
    runtimeDirPath?: string;
    handleException?: boolean;
    host?: string;
    port?: number;
    logger?: EventLogOptions;
    frontLogUrl?: string;
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
    backendDirPath: string;
    frontendDirPath: string;
    runtimeDirPath: string;
    sessionDirPath: string;
    indexModule: IndexModule;
    monitorModule: MonitorModule;
    viewerModule: ViewerModule;
    editorModule: EditorModule;
    startTime: Date;
    createAppQueue: {
        [route: string]: EmptyPromise[] | null;
    };
    private eventLog;
    constructor(params?: BackHostAppParams);
    init(): Promise<void>;
    run(): Promise<void>;
    getHost(): string;
    getPort(): number;
    createHttpServer(): void;
    checkNodeVersion(): void;
    checkApplicationFolder(): void;
    createTempDirsIfNotExistSync(): void;
    private createEventLog;
    initModules(): Promise<void>;
    createWebSocketServer(): void;
    initDirPaths(): void;
    composeStartMessage(host: string, port: string | number): string;
    listenProcessEvents(): void;
    getSecretSync(): string;
    initExpressServer(): void;
    createApplicationIfNotExists(context: Context): Promise<BkApplication>;
    beginCreateApplication(context: Context): Promise<BkApplication>;
    getApplication(context: Context): BkApplication;
    getApplicationByRoute(route: string): BkApplication;
    getSrcAppFilePath(context: Context): string;
    getDistAppFilePath(context: Context): string;
    createApplication(context: Context): Promise<BkApplication>;
    getApplicationClass(appInfo: AppInfo): typeof BkApplication;
    createAppInfos(req: Request): Promise<AppInfo[]>;
    composeContextData(err: Error, req: Request): {
        headers: any;
        method: string;
        host: any;
        originalUrl: string;
        uri: string;
        platformVersion: any;
        appVersion: string | null;
        route: string | null;
        body: any;
        status: number | null;
        data: object | null;
    };
    logError(err: Error, req?: Request): Promise<void>;
    logEvent(context: Context, message: string, data?: object): Promise<void>;
    indexGet(req: Request, res: Response, next: NextFunction): Promise<void>;
    indexPost(req: Request, res: Response, next: NextFunction): Promise<void>;
    monitorGet(req: Request, res: Response, next: NextFunction): Promise<void>;
    moduleGet(req: Request, res: Response, next: NextFunction): Promise<void>;
    modulePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    moduleGetFile(req: Request, res: Response, next: NextFunction): Promise<void>;
    _e404(req: Request, res: Response, next: NextFunction): Promise<void>;
    _e500(err: any, req: Request, res: Response, next: NextFunction): Promise<void>;
    static runHttpServer(httpServer: http.Server, host: string, port: number): Promise<void>;
    onProcessMessage(message: string): Promise<void>;
    onProcessSIGINT(): Promise<void>;
    onProcessSIGTERM(): Promise<void>;
    onProcessExit(code: number): void;
    onUncaughtException(err: Error, origin: string): Promise<void>;
    onUnhandledRejection(reason: Error | any, promise: Promise<any>): Promise<void>;
    shutdown(): Promise<void>;
    onHttpServerError(err: any): void;
    getDomainFromRequest(req: any): Nullable<string>;
    postError(req: Request, res: Response, next: (err?: Error) => void): Promise<void>;
    getFrontendDirPath(): string;
    initCustomRoutes(): void;
    alias(method: 'get' | 'post', path: string, [module, appDirName, appFileName, env, domain]: Route, cb: string, query?: Record<string, Scalar | null>): void;
    getPostAlias(path: string, route: Route, query?: Record<string, Scalar | null>): void;
    getNodeEnv(): Nullable<string>;
    isDevelopment(): boolean;
    isProduction(): boolean;
    getParams(): BackHostAppParams;
    broadcastResult(sourceApplication: BkApplication, context: Context, result: Result): void;
    static test(): void;
    getLogger(): EventLog;
    getFrontLogUrl(): Optional<string>;
}
