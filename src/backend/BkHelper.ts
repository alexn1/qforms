import fetch from 'node-fetch';
import { JSONString } from '../types';
import { Helper } from '../frontend';

export class BkHelper {
    static templateToJsString(value: string, params: Record<string, any>) {
        return value.replace(/\$\{([\w.@]+)\}/g, (text, name) => {
            if (Object.prototype.hasOwnProperty.call(params, name)) {
                return `Helper.decodeValue('${BkHelper.encodeValue(params[name])}')`;
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

    static mapObject(object: any, cb: any) {
        return Object.keys(object).reduce((obj: any, key) => {
            const [newKey, newVal] = cb(key, object[key]) as [string, any];
            obj[newKey] = newVal;
            return obj;
        }, {});
    }

    /*
     * timeOffset number in minutes
     */
    static today(timeOffset: number) {
        // debug('BkHelper.today', timeOffset);
        let ts = Date.now();
        if (timeOffset !== undefined && timeOffset !== null) {
            ts += BkHelper.MINUTE() * timeOffset;
        }
        const date = new Date(ts);
        ts = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        if (timeOffset !== undefined && timeOffset !== null) {
            ts -= BkHelper.MINUTE() * timeOffset;
        }
        return new Date(ts);
    }

    /* static dateTimeReviver(key: any, value: string | number | Date) {
        if (typeof value === 'string') {
            const a =
                /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?(Z|([+-])(\d{2}):(\d{2}))?$/.exec(
                    value,
                );
            if (a) return new Date(value);
        }
        return value;
    } */

    /* static decodeValue(rawValue: JSONString): any {
        if (rawValue === undefined) throw new Error('decodeValue: undefined');
        if (rawValue === null) throw new Error('decodeValue: null');
        if (rawValue === '') throw new Error('decodeValue: empty string');
        try {
            return JSON.parse(rawValue, Helper.dateTimeReviver);
        } catch (err) {
            throw new Error(`decodeValue failed: ${err.message}, raw: "${rawValue}"`);
        }
    } */

    static encodeValue(value: any): JSONString {
        return JSON.stringify(value) as JSONString;
    }

    static decodeObject(obj: any): Record<string, any> {
        const dObj: any = {};
        for (const name in obj) {
            if (typeof obj[name] !== 'string')
                throw new Error(`cannot decode: ${name}, type: ${typeof obj[name]}`);
            dObj[name] = Helper.decodeValue(obj[name]);
        }
        return dObj;
    }

    static SECOND(): number {
        return 1000;
    }

    static MINUTE(): number {
        return 60 * BkHelper.SECOND();
    }

    static HOUR(): number {
        return 60 * BkHelper.MINUTE();
    }

    static DAY(): number {
        return 24 * BkHelper.HOUR();
    }

    static WEEK(): number {
        return 7 * BkHelper.DAY();
    }

    static addMinutes(date: Date, minutes: number): void {
        // debug('BkHelper.addMinutes', date, minutes);
        date.setMinutes(date.getMinutes() + minutes);
    }

    static removeTimezoneOffset(date: Date): void {
        BkHelper.addMinutes(date, -date.getTimezoneOffset());
    }

    static addTimezoneOffset(date: Date): void {
        BkHelper.addMinutes(date, date.getTimezoneOffset());
    }

    static cloneDate(date: Date): Date {
        return new Date(date.getTime());
    }

    static fillArray(n: number): number[] {
        return Array.from(Array(n).keys());
    }

    /* static formatDate(date: Date, format: string) {
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
        return format.replace(/\{([\w.]+)\}/g, (text, name: string) =>
            // @ts-ignore
            values[name] ? values[name] : text,
        );
    } */

    static getFirstField(object: any) {
        const [key] = Object.keys(object);
        if (!key) throw new Error('getFirstField: no fields');
        return object[key];
    }

    static argvAsKeyValue(argv: string[], slice: number = 2): Record<string, string> {
        return argv
            .slice(slice)
            .map((arg) => arg.split('='))
            .reduce((record: Record<string, string>, [key, value]: [string, string]) => {
                record[key] = value;
                return record;
            }, {} as Record<string, string>);
    }

    static templateArray(arr: any[]) {
        return arr.map((item) => {
            const type = typeof item;
            if (type === 'number' || type === 'boolean') {
                return item;
            }
            if (type === 'string') {
                return `'${item}'`;
            }
            throw new Error(`wrong type for array item: ${type}`);
        });
    }

    static formatNumber(value: number): string {
        return new Intl.NumberFormat('ru-RU').format(value);
    }

    static formatTime2(_sec: number): string {
        // debug('BkHelper.formatTime', sec);
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

    static registerGlobalClass(Class: any): void {
        // debug('BkHelper.registerGlobalClass', Class.name);
        // @ts-ignore
        if (global[Class.name]) throw new Error(`global.${Class.name} already used`);
        // @ts-ignore
        global[Class.name] = Class;
    }

    static getContentFromDataUrl(value: string): [contentType: string, buffer: Buffer] {
        const [type, data] = value.split(';');
        const contentType = type.split(':')[1];
        const base64string = data.split(',')[1];
        // debug('base64string:', base64string);
        const buffer = Buffer.from(base64string, 'base64');
        return [contentType, buffer];
    }

    static async post(url: string, data: any): Promise<any> {
        const response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) return await response.json();
        throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
    }
}

BkHelper.registerGlobalClass(BkHelper);
