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
}

Helper.SECOND = 1000;
Helper.MINUTE = 60*Helper.SECOND;
Helper.HOUR = 60*Helper.MINUTE;
Helper.DAY = 24*Helper.HOUR;
