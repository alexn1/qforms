class FrontHostApp {
    constructor(data) {
        console.log('FrontHostApp.constructor', data);
        this.data = data;
        if (data) {
            this.env = data.env;
        }
        window.addEventListener('error', this.onWindowError.bind(this));
        window.onunhandledrejection = this.onunhandledrejection.bind(this);
        //window.onerror              = this.errorHandler.bind(this);
        //window.onbeforeunload       = this.exit.bind(this);
    }
    run() {
        console.log('FrontHostApp.run');

        // application
        const application = new Application(this.data);
        application.init();

        // applicationController
        const applicationController = ApplicationController.create(application);
        applicationController.init();

        // view
        const rootElementName = `.${applicationController.getViewClass().name}__root`;
        const rootElement = document.querySelector(rootElementName);
        if (!rootElement) {
            throw new Error(`no root element: ${rootElementName}`);
        }
        applicationController.createView(rootElement);
    }

    /*exit(evt) {
        const message = 'After refreshing or closing of page, all opened pages and unsaved data will be lost.';
        if (typeof evt === 'undefined') {
            evt = window.event;
        }
        if (evt) {
            evt.returnValue = message;
        }
        return message;
    }*/

    /*errorHandler(errorMsg) {
        console.error('FrontHostApp.errorHandler:', errorMsg);
        let message = errorMsg;
        const stack = arguments[4] !== undefined && arguments[4].stack !== undefined ? arguments[4].stack : null;

        if (this.env === 'development') {
            message = 'FrontHostApp Error Handler:\n' + errorMsg;
            if (stack) {
                console.error('stack:', stack);
                message += '\n\nstack:\n' + stack;
            }
        }
        FrontHostApp.doHttpRequest({
            action: 'error',
            error: {message: errorMsg, stack}
        });
        alert(message);
    }*/
    onunhandledrejection(e) {
        // console.log('FrontHostApp.onunhandledrejection', e.constructor.name);
        const err = e instanceof Error ? e : e.reason || e.detail.reason;
        console.error('unhandled rejection:', err);
        alert(err.message);
    }
    onWindowError(e) {
        console.error('FrontHostApp.onWindowError', e.error);
        fetch(this.data.logErrorUrl, {
            method: 'POST',
            body  : JSON.stringify({
                message: e.error.message,
                stack  : e.error.stack,
                href   : window.location.href,
            }),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).catch(err => {
            console.error(err.message);
        });
        alert(e.error.message);
        e.preventDefault();
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
}
