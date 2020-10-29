'use strict';

class Helper {
    static currentDate() {
        const now = new Date();
        let dd = now.getDate();if (dd < 10) dd = '0' + dd;
        let mm = now.getMonth()+1;if (mm < 10) mm = '0' + mm;   /*January is 0!*/
        const yyyy = now.getFullYear();
        return [yyyy, mm, dd].join('-');
    }

    static currentDateTime() {
        return Helper.currentDate() + ' ' + Helper.currentTime();
    }

    static currentTime() {
        const now = new Date();
        let hh = now.getHours();if (hh < 10) hh = '0' + hh;
        let mm = now.getMinutes();if (mm < 10) mm = '0' + mm;
        let ss = now.getSeconds();if (ss < 10) ss = '0' + ss;
        return [hh, mm, ss].join(':');
    }

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

    static today() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    static encodeObject(obj) {
        const eObj = {};
        for (const name in obj) {
            eObj[name] = JSON.stringify(obj[name]);
        }
        return eObj;
    }

    static dateTimeReviver(key, value) {
        if (typeof value === 'string') {
            const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(value);
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

    static readImage(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            // reader.readAsArrayBuffer(file);
            reader.readAsDataURL(file);
        });
    }

    static convertBufferToBase64string(buffer) {
        const array = new Uint8Array(buffer);
        const binaryString = String.fromCharCode.apply(null, array);
        return window.btoa(binaryString);
    }
    /*static convertBufferToImageUrl(buffer, type = 'image/png') {
        const blob = new Blob([new Uint8Array(buffer)], {type});
        return  window.URL.createObjectURL(blob);
    }*/

    // append file as filed and all not file as json string
    static createFormData(body) {
        const formData = new FormData();
        const fields = {};
        for (const name in body) {
            console.log(name, body[name]);
            if (body[name] instanceof File) {
                formData.append(`_${name}`, body[name]);
            } else {
                fields[name] = body[name];
            }
        }
        formData.append('json', JSON.stringify(fields));
        return formData;
    }
}


