/// <reference types="node" />
import { Server } from 'http';
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
import { Optional, Scalar, Route } from '../types';
import { EventLog, EventLogOptions } from './EventLog';
import { EmptyPromise } from './EmptyPromise';
import { Nullable } from '../types';
export interface BackHostAppConfig {
    srcDirPath?: string;
    distDirPath?: string;
    runtimeDirPath?: string;
    codeRootDirPath?: string;
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
export declare class BackHostApp<TParams extends BackHostAppConfig = BackHostAppConfig> {
    private config;
    applications: {
        [route: string]: BkApplication;
    };
    private express;
    httpServer: Server;
    wsServer: WebSocketServer;
    private srcDirPath;
    distDirPath: string;
    backendDirPath: string;
    frontendDirPath: string;
    runtimeDirPath: string;
    sessionDirPath: string;
    private router;
    indexModule: IndexModule;
    monitorModule: MonitorModule;
    viewerModule: ViewerModule;
    editorModule: EditorModule;
    startTime: Date;
    createAppQueue: {
        [route: string]: Nullable<Array<EmptyPromise<BkApplication>>>;
    };
    private eventLog;
    constructor(config?: TParams);
    init(): Promise<void>;
    run(): Promise<void>;
    getHost(): string;
    getPort(): number;
    createHttpServer(): void;
    checkApplicationFolder(): void;
    createTempDirsIfNotExistSync(): void;
    private createEventLog;
    initRouter(): void;
    initModules(): Promise<void>;
    createWebSocketServer(): void;
    initDirPaths(): void;
    getCodeRootDirPath(): string;
    composeStartMessage(): string;
    listenProcessEvents(): void;
    createExpressServer(): void;
    initExpressServer(): void;
    useMiddlewares(): void;
    initSystemRoutes(): void;
    initCustomRoutes(): void;
    useStatic(): void;
    useErrors(): void;
    createApplicationIfNotExists(context: Context): Promise<BkApplication>;
    beginCreateApplication(context: Context): Promise<BkApplication>;
    getApplication(context: Context): BkApplication;
    getApplicationByRoute(route: string): BkApplication;
    getSrcAppFilePath(context: Context): string;
    getDistAppFilePath(context: Context): string;
    createApplication(context: Context): Promise<BkApplication>;
    getApplicationClass(appInfo: AppInfo): typeof BkApplication;
    createAppInfos(req: Request): Promise<AppInfo[]>;
    logError(err: Error, req?: Request): Promise<void>;
    composeContextData(err: Error, req: Request): {
        route: string | null | undefined;
        headers: import("http").IncomingHttpHeaders;
        method: string;
        host: string | undefined;
        originalUrl: string;
        uri: string;
        platformVersion: string;
        appVersion: string | null;
        body: any;
        status: number | null;
        data: object | null;
    };
    logEvent(context: Context, message: string, data?: object): Promise<void>;
    _e404(req: Request, res: Response, next: NextFunction): Promise<void>;
    _e500(err: any, req: Request, res: Response, next: NextFunction): Promise<void>;
    static runHttpServer(httpServer: Server, host: string, port: number): Promise<void>;
    onProcessMessage(message: string): Promise<void>;
    onProcessSIGINT(): Promise<void>;
    onProcessSIGTERM(): Promise<void>;
    onProcessExit(code: number): void;
    onUncaughtException(err: Error, origin: string): Promise<void>;
    onUnhandledRejection(reason: Error | any, promise: Promise<any>): Promise<void>;
    shutdown(): Promise<void>;
    onHttpServerError(err: any): void;
    static getDomainFromRequest(req: Request): Nullable<string>;
    getDomain(req: Request): Nullable<string>;
    optionsError(req: Request, res: Response, next: NextFunction): Promise<void>;
    postError(req: Request, res: Response, next: (err?: Error) => void): Promise<void>;
    static getQueryFromParams(req: Request, query: Record<string, Nullable<Scalar>>): Record<string, any>;
    createCustomRoute(path: string | RegExp, route: Route, optionsOrCallBack?: Record<string, Nullable<Scalar>> | ((req: Request) => void)): void;
    broadcastResult(sourceApplication: BkApplication, context: Context, result: Result): void;
    getLogger(): EventLog;
    getFrontLogUrl(): Optional<string>;
    getHttpServer(): Server;
    getFrontendDirPath(): string;
    getNodeEnv(): Nullable<string>;
    isDevelopment(): boolean;
    getParams(): TParams;
    getExpress(): Express;
    getSrcDirPath(): string;
    getPlatformVersion(): string;
}
