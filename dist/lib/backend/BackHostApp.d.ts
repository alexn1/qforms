import Context from '../backend/Context';
import Application from './viewer/Model/Application/Application';
import { AppInfo } from './AppInfo';
import MonitorModule from './monitor/MonitorModule';
import IndexModule from './index/IndexModule';
import ViewerModule from './viewer/ViewerModule';
import EditorModule from './editor/EditorModule';
import CommonModule from './common/CommonModule';
import Result from "./Result";
declare class BackHostApp {
    params: any;
    applications: any;
    express: any;
    httpServer: any;
    wsServer: any;
    appsDirPath: string;
    frontendDirPath: string;
    runtimeDirPath: string;
    sessionDirPath: string;
    logPool: any;
    commonModule: CommonModule;
    indexModule: IndexModule;
    monitorModule: MonitorModule;
    viewerModule: ViewerModule;
    editorModule: EditorModule;
    startTime: Date;
    logErrorUrl: string;
    constructor(params?: any);
    checkVersion(): void;
    run(): Promise<void>;
    initProcess(): void;
    getSecretSync(): any;
    initExpressServer(): void;
    createApplicationIfNotExists(context: Context): Promise<any>;
    getApplication(context: Context): Application;
    getApplicationByRoute(route: any): Application;
    getAppFilePath(context: Context): any;
    createApplication(context: Context): Promise<Application>;
    getApplicationClass(appInfo: AppInfo): typeof Application;
    createApp(req: any): Promise<AppInfo[]>;
    logError(err: any, req?: any): Promise<void>;
    logRequest(req: any, context: Context, time: any): Promise<void>;
    static createLog(cnn: any, values: any): Promise<void>;
    moduleGet(req: any, res: any, next: any): Promise<void>;
    indexGet(req: any, res: any, next: any): Promise<void>;
    indexPost(req: any, res: any, next: any): Promise<void>;
    monitorGet(req: any, res: any, next: any): Promise<void>;
    modulePost(req: any, res: any, next: any): Promise<void>;
    moduleGetFile(req: any, res: any, next: any): Promise<void>;
    _e404(req: any, res: any, next: any): Promise<void>;
    _e500(err: any, req: any, res: any, next: any): Promise<void>;
    createAndRunHttpServer(host: any, port: any): any;
    onProcessMessage(message: any): Promise<void>;
    onProcessSIGINT(): Promise<void>;
    onProcessSIGTERM(): void;
    onProcessExit(code: any): void;
    onUnhandledRejection(err: any): Promise<void>;
    shutdown(): Promise<void>;
    onHttpServerError(err: any): void;
    getDomain(req: any): string;
    postError(req: any, res: any, next: any): Promise<void>;
    getFrontendDirPath(): string;
    initCustomRoutes(): void;
    alias(method: string, path: string, [module, appDirName, appFileName, env]: [any, any, any, any], cb: string, query?: any): void;
    getPostAlias(path: any, arr: any, query: any): void;
    getNodeEnv(): string;
    isDevelopment(): boolean;
    isProduction(): boolean;
    getParams(): any;
    broadcastResult(sourceApplication: Application, context: Context, result: Result): void;
}
export = BackHostApp;
