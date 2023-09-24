import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { JSONString, Scalar, Query, QueryRecord, KeyTuple, Key } from '../../types';
import { ReactComponent } from './ReactComponent';
import { debug } from '../../console';

export class Helper {
    static formatDate(date: Date, format: string) {
        const YYYY = date.getFullYear();
        const M = date.getMonth() + 1;
        const D = date.getDate();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const MM = M < 10 ? `0${M}` : M;
        const DD = D < 10 ? `0${D}` : D;
        const hh = h < 10 ? `0${h}` : h;
        const mm = m < 10 ? `0${m}` : m;
        const ss = s < 10 ? `0${s}` : s;
        const values = { YYYY, M, D, h, m, s, MM, DD, hh, mm, ss };
        return format.replace(/\{([\w.]+)\}/g, (text, name) =>
            // @ts-ignore
            values[name] ? values[name] : text,
        );
    }

    static formatNumber(value: number): string {
        return new Intl.NumberFormat('ru-RU').format(value);
    }

    static today() {
        const now = new Date();
        // return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return Helper.getStartOfDay(now);
    }

    static getStartOfDay(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    static encodeObject(obj: Record<string, any>): Record<string, JSONString> {
        const eObj = {} as Record<string, any>;
        for (const name in obj) {
            eObj[name] = Helper.encodeValue(obj[name]);
        }
        return eObj;
    }

    static encodeValue<T>(value: T): JSONString<T> {
        return JSON.stringify(value) as JSONString<T>;
    }

    static decodeObject(eObj: Record<string, JSONString>): Record<string, any> {
        if (!eObj) throw new Error('Helper.decodeObject: no object');
        const obj = {} as Record<string, any>;
        for (const name in eObj) {
            obj[name] = Helper.decodeValue(eObj[name]);
        }
        return obj;
    }

    /* static decodeValue(raw: JSONString): any {
        // try {
        return JSON.parse(raw, Helper.dateTimeReviver);
        // } catch (err) {
        //     // debug('raw:', raw);
        //     throw err;
        // }
    } */

    static decodeValue(rawValue: JSONString): any {
        if (rawValue === undefined) throw new Error('decodeValue: undefined');
        if (rawValue === null) throw new Error('decodeValue: null');
        if (rawValue === '') throw new Error('decodeValue: empty string');
        try {
            return JSON.parse(rawValue, Helper.dateTimeReviver);
        } catch (err) {
            throw new Error(`decodeValue failed: ${err.message}, raw: "${rawValue}"`);
        }
    }

    static dateTimeReviver(key: string, value: any) {
        if (typeof value === 'string') {
            const a =
                /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?(Z|([+-])(\d{2}):(\d{2}))?$/.exec(
                    value,
                );
            if (a) return new Date(value);
        }
        return value;
    }

    static createReactComponent(
        rootElement: Element,
        type: any,
        props = {},
        children?: ReactNode[],
    ): ReactComponent | undefined {
        // debug('Helper.createReactComponent', rootElement, type);
        let component: ReactComponent | undefined = undefined;
        const reactRootElement = React.createElement(React.StrictMode, {}, [
            React.createElement(
                type,
                {
                    ...props,
                    onCreate: (c: ReactComponent, name: string) => {
                        component = c;
                    },
                } as any,
                children,
            ),
        ]);
        ReactDOM.render(reactRootElement, rootElement);
        return component;
    }

    static createReactComponent2(
        rootElement: Element,
        type: any,
        props = {},
        children?: ReactNode[],
    ): ReactComponent | undefined {
        // debug('Helper.createReactComponent2', rootElement, type);
        let component: ReactComponent | undefined = undefined;
        const reactRootElement = React.createElement(React.StrictMode, {}, [
            React.createElement(
                type,
                {
                    ...props,
                    onCreate: (c: ReactComponent, name: string) => {
                        component = c;
                    },
                } as any,
                children,
            ),
        ]);
        // ReactDOM.render(reactRootElement, rootElement);
        ReactDOM.hydrate(reactRootElement, rootElement);
        return component;
    }

    /* static destroyReactComponent(root) {
        ReactDOM.unmountComponentAtNode(root);
    } */

    static readFileAsDataURL(file: Blob) {
        return new Promise<string | ArrayBuffer | null>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    }

    /* static readFileAsArrayBuffer(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsArrayBuffer(file);
        });
    } */

    /* static convertBufferToBase64string(buffer) {
        const array = new Uint8Array(buffer);
        const binaryString = String.fromCharCode.apply(null, array);
        return window.btoa(binaryString);
    } */

    /* static createObjectUrl(buffer) {
        const blob = new Blob([new Uint8Array(buffer)]);
        return window.URL.createObjectURL(blob);
    } */

    // append file as filed and all not file as json string
    /* static createFormData(body) {
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
    } */

    /* static base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    } */

    static templateToJsString(value: string, params: Record<string, any>) {
        return value.replace(/\$\{([\w.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return `Helper.decodeValue('${Helper.encodeValue(params[name])}')`;
            }
            return 'undefined';
        });
    }

    static moveArrItem(arr: any[], item: any, offset: number) {
        const oldIndex = arr.indexOf(item);
        if (oldIndex === -1) throw new Error('cannot find element');
        const newIndex = oldIndex + offset;
        if (newIndex < 0) throw new Error('cannot up top element');
        if (newIndex > arr.length - 1) throw new Error('cannot down bottom element');
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }

    static formatTime(_sec: number) {
        // debug('Helper.formatTime', sec);
        let sec = _sec;
        let sign = '';
        if (_sec < 0) {
            sec = -sec;
            sign = '-';
        }
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec - h * 3600) / 60);
        let s = Math.floor(sec - h * 3600 - m * 60);
        // @ts-ignore
        if (h < 10) h = '0' + h;
        // @ts-ignore
        if (m < 10) m = '0' + m;
        // @ts-ignore
        if (s < 10) s = '0' + s;
        if (Math.floor(sec / 3600) === 0) {
            return `${sign}${m}:${s}`;
        } else {
            return `${sign}${h}:${m}:${s}`;
        }
    }

    static formatTime2(_sec: number) {
        // debug('Helper.formatTime', sec);
        let sec = _sec;
        let sign = '';
        if (_sec < 0) {
            sec = -sec;
            sign = '-';
        }
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec - h * 3600) / 60);
        let s = Math.floor(sec - h * 3600 - m * 60);
        // @ts-ignore
        if (h < 10) h = '0' + h;
        // @ts-ignore
        if (m < 10) m = '0' + m;
        // @ts-ignore
        if (s < 10) s = '0' + s;
        if (Math.floor(sec / 3600) === 0) {
            return `${sign}${m}m:${s}s`;
        } else {
            return `${sign}${h}h:${m}m:${s}s`;
        }
    }

    static SECOND() {
        return 1000;
    }

    static MINUTE() {
        return 60 * Helper.SECOND();
    }

    static HOUR() {
        return 60 * Helper.MINUTE();
    }

    static DAY() {
        return 24 * Helper.HOUR();
    }

    static WEEK() {
        return 7 * Helper.DAY();
    }

    static fallbackCopyTextToClipboard(text: string) {
        // debug('Helper.fallbackCopyTextToClipboard', text);
        const activeElement = document.activeElement;
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0'; // Avoid scrolling to bottom
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        // @ts-ignore
        activeElement.focus();
    }

    static async copyTextToClipboard(text: string) {
        debug('Helper.copyTextToClipboard', text);
        if (!navigator.clipboard) {
            Helper.fallbackCopyTextToClipboard(text);
            return;
        }
        await navigator.clipboard.writeText(text);
    }

    static addMinutes(date: Date, minutes: number) {
        // console.lodebugg('Helper.addMinutes', date, minutes);
        date.setMinutes(date.getMinutes() + minutes);
    }

    static removeTimezoneOffset(date: Date) {
        Helper.addMinutes(date, -date.getTimezoneOffset());
    }

    static addTimezoneOffset(date: Date) {
        Helper.addMinutes(date, date.getTimezoneOffset());
    }

    static cloneDate(date: Date) {
        return new Date(date.getTime());
    }

    static fillArray(n: number) {
        return Array.from(Array(n).keys());
    }

    // static inIframe(): boolean {
    //     return false;
    //     /* try {
    //         return window.self !== window.top;
    //     } catch (e) {
    //         return false;
    //     } */
    // }

    static setCookie(name: string, value: Scalar, time: number) {
        let expires = '';
        if (time) {
            const date = new Date(time);
            // date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (encodeURIComponent(value) || '') + expires + '; path=/';
    }

    static getCookie(name: string): string | undefined {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return undefined;
    }

    static eraseCookie(name: string) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    static delay(ms: number = 1000) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    static registerGlobalClass(Class: any) {
        // debug('Helper.registerGlobalClass', Class.name);
        if (typeof window === 'object') {
            if (window[Class.name]) throw new Error(`window.${Class.name} already used`);
            window[Class.name] = Class;
        } else {
            // @ts-ignore
            if (global[Class.name]) throw new Error(`global.${Class.name} already used`);
            // @ts-ignore
            global[Class.name] = Class;
        }
    }

    static getGlobalClass(className: string): any {
        // debug('Helper.getGlobalClass', className);
        // @ts-ignore
        return typeof window === 'object' ? window[className] : global[className];
    }

    static addClassToDocumentElement(className: string) {
        if (typeof document === 'object') {
            document.documentElement.classList.add(className);
        }
    }

    static headersToRecord(headers: Headers): Record<string, string> {
        return Array.from(headers.entries()).reduce(
            (acc: Record<string, string>, header: [string, string]) => {
                const [name, value] = header;
                acc[name] = value;
                return acc;
            },
            {} as Record<string, string>,
        );
    }

    static queryToString(query: Query) {
        // pConsole.debug('Helper.queryToString', query);
        return Object.keys(query)
            .filter((name: keyof Query) => query[name] !== undefined)
            .map((name: keyof Query) => {
                const value = query[name];
                if (typeof value === 'string') {
                    return `${name}=${encodeURIComponent(value)}`;
                }
                return Helper.queryRecordToString(name, value);
            })
            .join('&');
    }

    static queryRecordToString(name: string, record: QueryRecord) {
        // pConsole.debug('Helper.queryRecordToString', name, record);
        return Object.keys(record)
            .filter((field: keyof QueryRecord) => record[field] !== undefined)
            .map((field: keyof QueryRecord) => {
                const val = encodeURIComponent(record[field])
                    .replace(/^%22/, '"')
                    .replace(/%22$/, '"')
                    .replace(/%20/g, '+');
                return `${name}[${field}]=${val}`;
            })
            .join('&');
    }

    static keyTupleToKey(keyArray: KeyTuple): Key {
        return JSON.stringify(keyArray) as Key;
    }

    static keyToKeyTuple(key: Key): KeyTuple {
        return JSON.parse(key);
    }

    static currentTime() {
        const now = new Date();
        const arrN = [now.getHours(), now.getMinutes(), now.getSeconds()];
        const arrS = arrN.map((n) => n.toString());
        for (let i = 0; i < arrN.length; i++) {
            if (arrN[i] < 10) {
                arrS[i] = '0' + arrS[i];
            }
        }
        return arrS.join(':');
    }
}

Helper.registerGlobalClass(Helper);
