import { Query } from '../../types';
export interface FrontHostAppOptions {
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
export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
export declare class FrontHostApp {
    protected options?: FrontHostAppOptions | undefined;
    alertCtrl: any;
    documentTitle: string;
    constructor(options?: FrontHostAppOptions | undefined);
    init(): void;
    run(): Promise<void>;
    onWindowUnhandledrejection(e: any): Promise<void>;
    onWindowError(e: any): Promise<void>;
    logError(err: any): void;
    static doHttpRequest(data: any): Promise<any>;
    static doHttpRequest2(method: RequestMethod, url: string, body?: any): Promise<any[]>;
    static composeHandlerName(data: any): string;
    static fetchJson(method: RequestMethod, url: string, data?: any): Promise<[headers: Record<string, string>, data: any]>;
    static fetch(method: RequestMethod, url: string, body?: any, contentType?: string): Promise<[headers: Record<string, string>, data: any]>;
    static startWait(): void;
    static stopWait(): void;
    onWindowPopState(e: any): Promise<void>;
    alert(options: {
        message: string;
        title?: string;
    }): Promise<void>;
    confirm(options: {
        message: string;
        title?: string;
        yesButton?: string;
        noButton?: string;
    }): Promise<boolean>;
    setDocumentTitle(title: string): void;
    getDocumentTitle(): string;
    createLink(query?: Query): string;
    getOptions(): FrontHostAppOptions;
    filterSearch(...names: string[]): string;
    getSearchParams(): any;
    getCookie(name: string): string | undefined;
    getLocation(): Location;
}
