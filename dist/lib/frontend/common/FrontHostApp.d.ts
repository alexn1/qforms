export interface FrontHostAppOptions {
    debug: boolean;
    url: URL;
}
export declare class FrontHostApp {
    protected options?: FrontHostAppOptions;
    alertCtrl: any;
    documentTitle: string;
    constructor(options?: FrontHostAppOptions);
    init(): void;
    run(): Promise<void>;
    onWindowUnhandledrejection(e: any): Promise<void>;
    onWindowError(e: any): Promise<void>;
    static doHttpRequest(data: any): Promise<any>;
    logError(err: any): void;
    static doHttpRequest2(data: any): Promise<any[]>;
    static postJson(url: any, data: any): Promise<any[]>;
    static post(url: any, body: any, contentType: any): Promise<any[]>;
    static startWait(): void;
    static stopWait(): void;
    onWindowPopState(e: any): Promise<void>;
    alert(options: any): Promise<any>;
    confirm(options: any): Promise<any>;
    setDocumentTitle(title: string): void;
    getDocumentTitle(): string;
    isDebugMode(): boolean;
    createLink(params?: any): string;
    getOptions(): FrontHostAppOptions;
    filterSearch(names: string[]): string;
    getSearchParams(): any;
}
