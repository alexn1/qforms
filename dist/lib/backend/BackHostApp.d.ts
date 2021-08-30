import Context from '../backend/Context';
import Application from './viewer/Model/Application/Application';
import { AppInfo } from './AppInfo';
import MonitorModule from './monitor/MonitorModule';
import IndexModule from './index/IndexModule';
import ViewerModule from './viewer/ViewerModule';
import EditorModule from './editor/EditorModule';
import CommonModule from './common/CommonModule';
declare class BackHostApp {
    params: any;
    applications: any;
    server: any;
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
    run(): void;
    initProcess(): void;
    getSecretSync(): any;
    initExpressServer(): void;
    createApplicationIfNotExists(req: any, context: Context): Promise<any>;
    getApplication(context: Context): Application;
    getAppFilePath(context: Context): any;
    createApplication(appFilePath: any, context: Context): Promise<Application>;
    getApplicationClass(appInfo: AppInfo): Promise<typeof Application>;
    handleViewerGet(req: any, res: any, context: Context): Promise<void>;
    handleViewerPost(req: any, res: any, context: Context): Promise<any>;
    loginGet(req: any, res: any, context: Context): Promise<void>;
    loginPost(req: any, res: any, context: Context): Promise<void>;
    page(req: any, res: any, context: Context): Promise<void>;
    select(req: any, res: any, context: Context): Promise<number>;
    selectSingle(req: any, res: any, context: Context): Promise<number>;
    selectMultiple(req: any, res: any, context: Context): Promise<number>;
    insert(req: any, res: any, context: Context): Promise<void>;
    update(req: any, res: any, context: Context): Promise<void>;
    _delete(req: any, res: any, context: Context): Promise<void>;
    rpc(req: any, res: any, context: Context): Promise<void>;
    logout(req: any, res: any, context: Context): Promise<void>;
    test(req: any, res: any, context: Context): Promise<void>;
    handleEditorGet(req: any, res: any, context: Context): Promise<void>;
    handleEditorPost(req: any, res: any, context: Context): Promise<void>;
    createApp(req: any): Promise<any[]>;
    logError(req: any, err: any): Promise<void>;
    logRequest(req: any, context: Context, time: any): Promise<void>;
    static createLog(cnn: any, values: any): Promise<void>;
    appGet(req: any, res: any, next: any): Promise<void>;
    indexGet(req: any, res: any, next: any): Promise<void>;
    indexPost(req: any, res: any, next: any): Promise<void>;
    monitorGet(req: any, res: any, next: any): Promise<void>;
    appPost(req: any, res: any, next: any): Promise<void>;
    appGetFile(req: any, res: any, next: any): Promise<void>;
    _e404(req: any, res: any, next: any): Promise<void>;
    _e500(err: any, req: any, res: any, next: any): Promise<void>;
    createAndRunHttpServer(host: any, port: any): void;
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
}
export = BackHostApp;
