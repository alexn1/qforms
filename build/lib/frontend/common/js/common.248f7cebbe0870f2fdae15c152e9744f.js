class FrontHostApp {
    constructor(data) {
        // console.log('FrontHostApp.constructor', data);
        if (!data) throw new Error('no data');
        this.data = data;
        // if (data) {
        this.env = data.env;
        // }
        window.addEventListener('error'             , this.onWindowError.bind(this));
        window.addEventListener('unhandledrejection', this.onWindowUnhandledrejection.bind(this))
        // window.onunhandledrejection = this.onunhandledrejection.bind(this);
        // window.onerror              = this.errorHandler.bind(this);
        // window.onbeforeunload       = this.exit.bind(this);
    }
    run() {
        throw new Error('FrontHostApp.run not implemented');
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
    onWindowUnhandledrejection(e) {
        console.log('FrontHostApp.onWindowUnhandledrejection', e);
        const err = e instanceof Error ? e : e.reason || e.detail.reason;
        this.logError(err);
        alert(err.message);
        e.preventDefault();
    }
    onWindowError(e) {
        console.log('FrontHostApp.onWindowError', e);
        const err = e.error;
        this.logError(err);
        alert(err.message);
        e.preventDefault();
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
}

window.QForms.FrontHostApp = FrontHostApp;

class Helper {
    /*static currentDate() {
        const now = new Date();
        let dd = now.getDate();if (dd < 10) dd = '0' + dd;
        let mm = now.getMonth()+1;if (mm < 10) mm = '0' + mm;   /!*January is 0!*!/
        const yyyy = now.getFullYear();
        return [yyyy, mm, dd].join('-');
    }*/

    /*static currentDateTime() {
        return Helper.currentDate() + ' ' + Helper.currentTime();
    }*/

    /*static currentTime() {
        const now = new Date();
        let hh = now.getHours();if (hh < 10) hh = '0' + hh;
        let mm = now.getMinutes();if (mm < 10) mm = '0' + mm;
        let ss = now.getSeconds();if (ss < 10) ss = '0' + ss;
        return [hh, mm, ss].join(':');
    }*/

    static formatDate(date, format) {
        const YYYY = date.getFullYear();
        const M    = date.getMonth() + 1;
        const D    = date.getDate();
        const h    = date.getHours();
        const m    = date.getMinutes();
        const s    = date.getSeconds();
        const MM = M < 10 ? `0${M}` : M;
        const DD = D < 10 ? `0${D}` : D;
        const hh = h < 10 ? `0${h}` : h;
        const mm = m < 10 ? `0${m}` : m;
        const ss = s < 10 ? `0${s}` : s;
        const values = {YYYY, M, D, h, m, s, MM, DD, hh, mm, ss};
        return format.replace(/\{([\w\.]+)\}/g, (text, name) => values[name] ? values[name] : text);
    }

    static formatNumber(value) {
        return new Intl.NumberFormat('ru-RU').format(value);
    }

    static today() {
        const now = new Date();
        // return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return Helper.getStartOfDay(now);
    }

    static getStartOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    static encodeObject(obj) {
        const eObj = {};
        for (const name in obj) {
            eObj[name] = Helper.encodeValue(obj[name]);
        }
        return eObj;
    }

    static encodeValue(value) {
        return JSON.stringify(value);
    }

    static decodeObject(eObj) {
        if (!eObj) throw new Error('Helper.decodeObject: no object');
        const obj = {};
        for (const name in eObj) {
            obj[name] = Helper.decodeValue(eObj[name]);
        }
        return obj;
    }

    static decodeValue(rawValue) {
        return JSON.parse(rawValue, Helper.dateTimeReviver);
    }

    static dateTimeReviver(key, value) {
        if (typeof value === 'string') {
            const a =
                // /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/
                /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+\-])(\d{2}):(\d{2}))$/
                .exec(value);
            if (a) return new Date(value);
        }
        return value;
    }
    static createReactComponent(root, type, props = {}, children) {
        // console.log('Helper.createReactComponent', root, type);
        let component;
        props.onCreate = c => component = c;
        const reactElement = React.createElement(type, props, children);
        ReactDOM.render(reactElement, root);
        return component;
    }
    static destroyReactComponent(root) {
        ReactDOM.unmountComponentAtNode(root);
    }

    static readFileAsDataURL(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    }

    /*static readFileAsArrayBuffer(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsArrayBuffer(file);
        });
    }*/

    /*static convertBufferToBase64string(buffer) {
        const array = new Uint8Array(buffer);
        const binaryString = String.fromCharCode.apply(null, array);
        return window.btoa(binaryString);
    }*/
    /*static createObjectUrl(buffer) {
        const blob = new Blob([new Uint8Array(buffer)]);
        return window.URL.createObjectURL(blob);
    }*/

    // append file as filed and all not file as json string
    /*static createFormData(body) {
        const formData = new FormData();
        const fields = {};
        for (const name in body) {
            if (body[name] instanceof File) {
                formData.append(name, body[name]);
            } else {
                fields[name] = body[name];
            }
        }
        formData.append('__json', JSON.stringify(fields));
        return formData;
    }*/

    /*static base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }*/

    static templateToJsString(value, params) {
        return value.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return `Helper.decodeValue('${Helper.encodeValue(params[name])}')`;
            }
            return 'undefined';
        });
    }
    static moveArrItem(arr, item, offset) {
        const oldIndex = arr.indexOf(item);
        if (oldIndex === -1) throw new Error('cannot find element');
        const newIndex = oldIndex + offset;
        if (newIndex < 0) throw new Error('cannot up top element');
        if (newIndex > arr.length - 1) throw new Error('cannot down bottom element');
        arr.splice(newIndex, 0,   arr.splice(oldIndex, 1)[0]);
    }
    static formatTime(_sec) {
        // console.log('Helper.formatTime', sec);
        let sec = _sec;
        let sign = '';
        if (_sec < 0) {
            sec = -sec;
            sign = '-';
        }
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec - h * 3600) / 60);
        let s = Math.floor(sec - h * 3600 - m * 60);
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;
        if (h === 0) {
            return `${sign}${m}:${s}`;
        } else {
            return `${sign}${h}:${m}:${s}`;
        }
    }
    static SECOND() {
        return 1000;
    }
    static MINUTE() {
        return 60 * Helper.SECOND();
    }
    static HOUR() {
        return 60*Helper.MINUTE();
    }
    static DAY() {
        return 24*Helper.HOUR();
    }
}

window.QForms.Helper = Helper;
