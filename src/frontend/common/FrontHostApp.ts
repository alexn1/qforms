import { Search } from '../common/Search';

export interface FrontHostAppOptions {
    debug: boolean;
    url: URL;
}

export class FrontHostApp {
    alertCtrl: any = null;
    documentTitle = ''; // for run on back

    constructor(protected options?: FrontHostAppOptions) {
        // console.log('FrontHostApp.constructor');
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
        console.log('FrontHostApp.onWindowUnhandledrejection' /*, e*/);
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
        console.log('FrontHostApp.onWindowError', e);
        try {
            e.preventDefault();
            const err = e.error;
            this.logError(err);
            // await this.alert({message: err.message});
        } catch (err) {
            console.error(`onWindowError error: ${err.message}`);
        }
    }

    static async doHttpRequest(data) {
        console.warn('FrontHostApp.doHttpRequest', 'POST', window.location.href, data);
        const [headers, body] = await FrontHostApp.postJson(window.location.href, data);
        console.warn(
            `body ${data.page}.${data.form}.${data.ds || data.name}.${data.action}:`,
            body,
        );
        return body;
    }

    logError(err) {
        console.error('FrontHostApp.logError', err);
    }

    static async doHttpRequest2(data) {
        console.warn('FrontHostApp.doHttpRequest2', 'POST', window.location.href, data);
        const [headers, body] = await FrontHostApp.postJson(window.location.href, data);
        console.warn(
            `body ${data.page}.${data.form}.${data.ds || data.name}.${data.action}:`,
            body,
        );
        return [headers, body];
    }

    static async postJson(url, data) {
        return await FrontHostApp.post(url, JSON.stringify(data), 'application/json;charset=utf-8');
    }

    static async post(url, body, contentType) {
        try {
            FrontHostApp.startWait();
            const response = await fetch(url, {
                method: 'POST',
                body: body,
                ...(contentType ? { headers: { 'Content-Type': contentType } } : {}),
            });
            if (response.ok) {
                const headers = Array.from(response.headers.entries()).reduce((acc, header) => {
                    const [name, value] = header;
                    acc[name] = value;
                    return acc;
                }, {});
                // console.log('headers:', headers);
                const body = await response.json();
                return [headers, body];
            }
            throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
        } finally {
            FrontHostApp.stopWait();
        }
    }

    static startWait() {
        document.querySelector('html').classList.add('wait');
    }

    static stopWait() {
        document.querySelector('html').classList.remove('wait');
    }

    async onWindowPopState(e) {
        console.log('FrontHostApp.onWindowPopState', e.state);
    }

    async alert(options): Promise<any> {
        console.log('FrontHostApp.alert', options);
        alert(options.message);
    }

    async confirm(options): Promise<any> {
        console.log('FrontHostApp.confirm', options);
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

    isDebugMode() {
        if (typeof window === 'object') {
            return Search.getObj()['debug'] === '1';
        } else {
            return this.getOptions().debug;
        }
    }

    createLink(params = null): string {
        const path =
            typeof window === 'object' ? window.location.pathname : this.getOptions().url.pathname;
        if (params) {
            return [
                path,
                [
                    ...(this.isDebugMode() ? ['debug=1'] : []),
                    ...Object.keys(params).map((name) => `${name}=${encodeURI(params[name])}`),
                ].join('&'),
            ].join('?');
        }
        return path;
    }

    getOptions() {
        if (!this.options) {
            throw new Error('no options');
        }
        return this.options;
    }

    filterSearch(names: string[]): string {
        if (typeof window === 'object') {
            return Search.filter(names);
        }
        const newObj = {};
        const obj = this.getOptions().url.searchParams;
        for (const name of names) {
            if (obj.hasOwnProperty(name)) {
                newObj[name] = obj[name];
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
}
