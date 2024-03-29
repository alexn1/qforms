import { Helper } from './Helper';
import { Search } from '../common/Search';
import { debug } from '../../console';
import { Action, Query } from '../../types';
import { CookieHelper } from './CookieHelper';

export interface FrontHostAppOptions {
    // debug: boolean;
    url: URL;
    cookies: { [name: string]: string };
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

export class FrontHostApp {
    alertCtrl: any = null;
    documentTitle = ''; // for run on back

    constructor(protected options?: FrontHostAppOptions) {
        // debug('FrontHostApp.constructor');
    }

    init() {
        window.addEventListener('error', this.onWindowError.bind(this));
        window.addEventListener('unhandledrejection', this.onWindowUnhandledrejection.bind(this));
        window.addEventListener('popstate', this.onWindowPopState.bind(this));
    }

    async run() {
        throw new Error('FrontHostApp.run not implemented');
    }

    async onWindowUnhandledrejection(e) {
        debug('FrontHostApp.onWindowUnhandledrejection' /* , e */);
        try {
            e.preventDefault();
            const err = e instanceof Error ? e : e.reason || e.detail.reason;
            this.logError(err);
            await this.alert({ title: 'Unhandled Rejection', message: err.message });
        } catch (err) {
            console.error(`onWindowUnhandledrejection error: ${err.message}`);
        }
    }

    async onWindowError(e) {
        debug('FrontHostApp.onWindowError', e);
        try {
            e.preventDefault();
            const err = e.error;
            this.logError(err);
            // await this.alert({message: err.message});
        } catch (err) {
            console.error(`onWindowError error: ${err.message}`);
        }
    }

    logError(err: any) {
        console.error('FrontHostApp.logError', err);
    }

    static async doHttpRequest(data: any) {
        console.warn('FrontHostApp.doHttpRequest', 'POST', window.location.href, data);
        const [, body] = await FrontHostApp.fetchJson('POST', window.location.href, data);
        console.warn(`body ${FrontHostApp.composeHandlerName(data)}:`, body);
        return body;
    }

    static async doHttpRequest2(method: RequestMethod, url: string, body?: any) {
        console.warn('FrontHostApp.doHttpRequest2', method, url, body);
        const [headers, data] = await FrontHostApp.fetchJson(method, url, body);
        if (body) {
            console.warn(`body ${FrontHostApp.composeHandlerName(body)}:`, data);
        } else {
            console.warn(data);
        }
        return [headers, data];
    }

    static composeHandlerName(data: any) {
        if (data.action === Action.rpc) {
            if (data.form) return `${data.page}.${data.form}.${data.name}.${data.action}`;
            if (data.page) return `${data.page}.${data.name}.${data.action}`;
            return `${data.name}.${data.action}`;
        }
        return `${data.page}.${data.form}.${data.ds}.${data.action}`;
    }

    static async fetchJson(
        method: RequestMethod,
        url: string,
        data?: any,
    ): Promise<[headers: Record<string, string>, data: any]> {
        return await FrontHostApp.fetch(
            method,
            url,
            data ? JSON.stringify(data) : undefined,
            'application/json',
        );
    }

    static async fetch(
        method: RequestMethod,
        url: string,
        body?: any,
        contentType?: string,
    ): Promise<[headers: Record<string, string>, data: any]> {
        try {
            FrontHostApp.startWait();
            const response = await fetch(url, {
                method,
                body,
                ...(contentType ? { headers: { 'Content-Type': contentType } } : {}),
            });
            if (response.ok) {
                const headers = Helper.headersToRecord(response.headers);
                const data = await response.json();
                return [headers, data];
            }
            throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
        } finally {
            FrontHostApp.stopWait();
        }
    }

    static startWait() {
        document.querySelector('html')!.classList.add('wait');
    }

    static stopWait() {
        document.querySelector('html')!.classList.remove('wait');
    }

    async onWindowPopState(e) {
        debug('FrontHostApp.onWindowPopState', e.state);
    }

    async alert(options: { message: string; title?: string }): Promise<void> {
        debug('FrontHostApp.alert', options);
        alert(options.message);
    }

    async confirm(options: {
        message: string;
        title?: string;
        yesButton?: string;
        noButton?: string;
    }): Promise<boolean> {
        debug('FrontHostApp.confirm', options);
        return confirm(options.message);
    }

    setDocumentTitle(title: string) {
        if (typeof document === 'object') {
            document.title = title;
        } else {
            this.documentTitle = title;
        }
    }

    getDocumentTitle(): string {
        if (typeof document === 'object') {
            return document.title;
        }
        return this.documentTitle;
    }

    createLink(query?: Query): string {
        const path = this.getPathName();
        if (query) {
            return [path, Helper.queryToString(query)].join('?');
        }
        return path;
    }

    getPathName() {
        return typeof window === 'object'
            ? window.location.pathname
            : this.getOptions().url.pathname;
    }

    getOptions(): FrontHostAppOptions {
        if (!this.options) {
            throw new Error('no options');
        }
        return this.options;
    }

    filterSearch(...names: string[]): string {
        if (typeof window === 'object') {
            return Search.filter(...names);
        }
        const newObj: Record<string, string> = {};
        const obj = this.getOptions().url.searchParams;
        for (const name of names) {
            if (obj.hasOwnProperty(name)) {
                newObj[name] = obj.get(name)!;
            }
        }
        return Search.objToString(newObj);
    }

    getSearchParams() {
        if (typeof window === 'object') {
            return Search.getObj();
        }
        // @ts-ignore
        return Object.fromEntries(this.getOptions().url.searchParams);
    }

    getCookie(name: string): string | undefined {
        if (typeof window === 'object') {
            return CookieHelper.getCookie(name);
        }
        return this.getOptions().cookies[name];
    }

    getLocation(): Location {
        if (typeof window === 'object') {
            return window.location;
        }
        return this.getOptions().url;
    }
}
