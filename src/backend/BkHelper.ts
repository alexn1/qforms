import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

export class BkHelper {
    static argvAsKeyValue(argv: string[], slice: number = 2): Record<string, string> {
        return argv
            .slice(slice)
            .map((arg) => arg.split('='))
            .reduce((record: Record<string, string>, [key, value]: [string, string]) => {
                record[key] = value;
                return record;
            }, {} as Record<string, string>);
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

    static newClientId() {
        return uuidv4();
    }

    /* static templateToJsString(value: string, params: Record<string, any>) {
        return value.replace(/\$\{([\w.@]+)\}/g, (text, name) => {
            if (Object.prototype.hasOwnProperty.call(params, name)) {
                return `Helper.decodeValue('${Helper.encodeValue(params[name])}')`;
            }
            return 'undefined';
        });
    } */

    /* static moveArrItem(arr: any[], item: any, offset: number) {
        const oldIndex = arr.indexOf(item);
        if (oldIndex === -1) throw new Error('cannot find element');
        const newIndex = oldIndex + offset;
        if (newIndex < 0) throw new Error('cannot up top element');
        if (newIndex > arr.length - 1) throw new Error('cannot down bottom element');
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    } */

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

    /* static encodeValue(value: any): JSONString {
        return JSON.stringify(value) as JSONString;
    } */

    /* static decodeObject(obj: any): Record<string, any> {
        const dObj: any = {};
        for (const name in obj) {
            if (typeof obj[name] !== 'string')
                throw new Error(`decodeObject: cannot decode: ${name}, type: ${typeof obj[name]}`);
            dObj[name] = Helper.decodeValue(obj[name]);
        }
        return dObj;
    } */

    /* static fillArray(n: number): number[] {
        return Array.from(Array(n).keys());
    } */

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

    /* static formatNumber(value: number): string {
        return new Intl.NumberFormat('ru-RU').format(value);
    } */
}

BkHelper.registerGlobalClass(BkHelper);
