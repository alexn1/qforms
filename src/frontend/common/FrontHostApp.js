class FrontHostApp {
    constructor() {
        // console.log('FrontHostApp.constructor');
        this.alertCtrl = null;

        // window
        window.addEventListener('error'             , this.onWindowError.bind(this));
        window.addEventListener('unhandledrejection', this.onWindowUnhandledrejection.bind(this))
        window.addEventListener('popstate'          , this.onWindowPopState.bind(this));
        // window.onunhandledrejection = this.onunhandledrejection.bind(this);
        // window.onerror              = this.errorHandler.bind(this);
        // window.onbeforeunload       = this.exit.bind(this);
    }
    async run() {
        throw new Error('FrontHostApp.run not implemented');
    }
    async onWindowUnhandledrejection(e) {
        console.log('FrontHostApp.onWindowUnhandledrejection'/*, e*/);
        try {
            e.preventDefault();
            const err = e instanceof Error ? e : e.reason || e.detail.reason;
            this.logError(err);
            await this.alert({title: 'Unhandled Rejection', message: err.message});
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
    logError(err) {
        console.error('FrontHostApp.logError', err);
        console.log(`post error to ${this.data.logErrorUrl}`);
        fetch(this.data.logErrorUrl, {
            method: 'POST',
            body  : JSON.stringify({
                href           : window.location.href,
                platformVersion: this.data.platformVersion,
                appVersion     : this.data.appVersion,
                message        : err.message,
                stack          : err.stack,
            }),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).catch(err => {
            console.error(err.message);
        });
    }
    static async doHttpRequest(data) {
        console.warn('FrontHostApp.doHttpRequest', 'POST', window.location.href, data);
        const result = await FrontHostApp.postJson(window.location.href, data);
        console.warn(`result ${data.page}.${data.form}.${data.ds || data.name}.${data.action}:`, result);
        return result;
    }

    static async postJson(url, data) {
        return await FrontHostApp.post(url, JSON.stringify(data), 'application/json;charset=utf-8');
    }

    static async post(url, body, contentType) {
        try {
            FrontHostApp.startWait();
            const res = await fetch(url, {
                method: 'POST',
                body  : body,
                ...(contentType ? {headers: {'Content-Type': contentType}} : {}),
            });
            if (res.ok) return await res.json();
            throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`);
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
    static getClassByName(className) {
        if (eval(`typeof ${className}`) === 'function') {
            return eval(className);
        }
        return null;
    }
    async onWindowPopState(e) {
        console.log('FrontHostApp.onWindowPopState', e.state);
    }
    alert(options) {
        console.log('FrontHostApp.alert', options);
        return new Promise((resolve, reject) => {
            try {
                const root = document.querySelector('.alert-root');
                if (root.childElementCount === 0) {
                    const ctrl = this.alertCtrl = new AlertController({
                        ...options,
                        onClose: result => {
                            this.alertCtrl = null;
                            ReactDOM.unmountComponentAtNode(root);
                            resolve(result);
                        }});
                    // console.log('ctrl:', ctrl);
                    const view = Helper.createReactComponent(root, ctrl.getViewClass(), {ctrl});
                    // console.log('view', view);
                    view.getElement().focus();
                } else {
                    reject(new Error('alert already exists'));
                }
            } catch (err) {
                reject(err);
            }
        });
    }
    confirm(options) {
        console.log('FrontHostApp.confirm', options);
        return new Promise((resolve, reject) => {
            try {
                const root = document.querySelector('.alert-root');
                if (root.childElementCount === 0) {
                    const ctrl = this.alertCtrl = new ConfirmController({
                        ...options,
                        onClose: result => {
                            this.alertCtrl = null;
                            ReactDOM.unmountComponentAtNode(root);
                            resolve(result);
                        }});
                    // console.log('ctrl:', ctrl);
                    const view = Helper.createReactComponent(root, ctrl.getViewClass(), {ctrl});
                    // console.log('view', view);
                    view.getElement().focus();
                } else {
                    reject(new Error('confirm already exists'));
                }
            } catch (err) {
                reject(err);
            }
        });
    }

}

window.QForms.FrontHostApp = FrontHostApp;
