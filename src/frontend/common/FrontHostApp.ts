import { Helper } from '../common/Helper';
import { Search } from '../common/Search';

export class FrontHostApp {
    alertCtrl: any = null;
    documentTitle = ''; // for run on back

    constructor() {
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

    static isDebugMode() {
        return Search.getObj()['debug'] === '1';
    }

    isDebugMode() {
        return Search.getObj()['debug'] === '1';
    }

    createLink(params = null): string {
        // const query = window.location.search.split('?')[1];
        // console.log('query:', query);
        if (params) {
            return [
                window.location.pathname,
                [
                    // ...(query ? query.split('&') : []),
                    ...(this.isDebugMode() ? ['debug=1'] : []),
                    ...Object.keys(params).map((name) => `${name}=${encodeURI(params[name])}`),
                ].join('&'),
            ].join('?');
        }
        return window.location.pathname;
    }
}

Helper.registerGlobalClass(FrontHostApp);
