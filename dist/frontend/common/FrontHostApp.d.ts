import { ChangesByKey } from '../viewer';
import { RawRow, Scalar } from '../../types';
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
export type RequestMethod = 'GET' | 'POST' | 'PATCH';
export interface RequestBody {
    action: 'page' | 'insert' | 'select' | 'update' | '_delete' | 'rpc' | 'logout';
    page?: string | null;
    form?: string | null;
    ds?: string;
    name?: string;
    uuid?: string;
    changes?: ChangesByKey;
    params?: Record<string, Scalar>;
    row?: RawRow;
    newMode?: boolean;
}
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
    static doHttpRequest2(method: RequestMethod, body: RequestBody): Promise<any[]>;
    static fetchJson(method: RequestMethod, url: string, data: any): Promise<any[]>;
    static fetch(method: RequestMethod, url: string, body: any, contentType: string): Promise<any[]>;
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
    isDebugMode(): boolean;
    createLink(params?: {
        [name: string]: any;
    } | null): string;
    getOptions(): FrontHostAppOptions;
    filterSearch(names: string[]): string;
    getSearchParams(): any;
    getCookie(name: string): string | undefined;
    getLocation(): Location;
}
