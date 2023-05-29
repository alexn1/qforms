export interface FrontHostAppOptions {
    debug: boolean;
    url: URL;
    cookies: {
        [name: string]: string;
    };
}
export interface Location {
    href: string;
    origin: string;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
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
    alert(options: {
        message: string;
        title?: string;
    }): Promise<any>;
    confirm(options: {
        message: string;
    }): Promise<any>;
    setDocumentTitle(title: string): void;
    getDocumentTitle(): string;
    isDebugMode(): boolean;
    createLink(params?: any): string;
    getOptions(): FrontHostAppOptions;
    filterSearch(names: string[]): string;
    getSearchParams(): any;
    getCookie(name: string): string;
    getLocation(): Location;
}
