import fs from 'fs';
import path from 'path';
// import slash from 'slash';
import colors from 'colors/safe';
import fetch from 'node-fetch';
import { access } from 'node:fs/promises';
import { JSONString } from '../types';
import { debug } from '../console';
import { _getFilePathsSync, _getFilePaths2 } from './FileHelper';

export class BkHelper {
    static getRandomString(length: number) {
        function getRandomInt(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const index = getRandomInt(0, chars.length - 1);
            result += chars.substr(index, 1);
        }
        return result;
    }

    static getFilePathsSync(publicDirPath: string, subDirPath: string, ext: string) {
        return _getFilePathsSync(path.join(publicDirPath, subDirPath), ext) /* .map((filePath) => {
            return slash(path.relative(publicDirPath, filePath));
        }) */;
    }

    static async getFilePaths(dirPath: string, ext: string): Promise<string[]> {
        // debug('BkHelper.getFilePaths');
        const filePaths: string[] = [];
        await _getFilePaths2(dirPath, ext, filePaths);
        const relativeFilePaths = filePaths; /* .map((filePath) => {
            return slash(path.relative(dirPath, filePath));
        }) */
        return relativeFilePaths;
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

    static templateToJsString(value: string, params: Record<string, any>) {
        return value.replace(/\$\{([\w.@]+)\}/g, (text, name) => {
            if (Object.prototype.hasOwnProperty.call(params, name)) {
                return `BkHelper.decodeValue('${BkHelper.encodeValue(params[name])}')`;
            }
            return 'undefined';
        });
    }

    static readTextFile(path: string): Promise<string> {
        // debug(colors.blue('BkHelper.readTextFile'), path);
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(content);
                }
            });
        });
    }

    static async getFileContent(filePath: string) {
        if (await BkHelper.exists2(filePath)) {
            return BkHelper.readTextFile(filePath);
        }
        return null;
    }
    static getFileContentSync(filePath: string) {
        // debug(colors.blue('BkHelper.getFileContentSync'), filePath);
        if (!fs.existsSync(filePath)) {
            return null;
        }
        return fs.readFileSync(filePath, 'utf8');
    }

    static readBinaryFile(filePath: string) {
        debug(colors.blue('BkHelper.readBinaryFile'), filePath);
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static createPath(arr: string[]) {
        if (arr.length === 0) throw new Error('no path elements');
        if (arr.length === 1) return '/';
        return arr.join('/');
    }

    static getDirPath(filePath: string) {
        const arr = filePath.split('/');
        return BkHelper.createPath(arr.slice(0, arr.length - 1));
    }

    static async createDirIfNotExists2(originalDirPath: string) {
        // debug('BkHelper.createDirIfNotExists2', originalDirPath);
        const arr = originalDirPath.split('/');
        for (let i = 1; i <= arr.length; i++) {
            const dirPath = BkHelper.createPath(arr.slice(0, i));
            const exists = await BkHelper.exists2(dirPath);
            if (!exists) {
                await BkHelper.createDirIfNotExists(dirPath);
            }
        }
    }

    static createDirIfNotExists(dirPath: string): Promise<void> {
        debug(colors.blue('BkHelper.createDirIfNotExists'), dirPath);
        return new Promise((resolve, reject) => {
            fs.exists(dirPath, (exists) => {
                if (exists) {
                    resolve();
                } else {
                    fs.mkdir(dirPath, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    static createDirIfNotExistsSync(dirPath: string) {
        // debug(colors.blue('BkHelper.createDirIfNotExistsSync'), dirPath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    }

    static moveArrItem(arr: any[], item: any, offset: number) {
        const oldIndex = arr.indexOf(item);
        if (oldIndex === -1) throw new Error('cannot find element');
        const newIndex = oldIndex + offset;
        if (newIndex < 0) throw new Error('cannot up top element');
        if (newIndex > arr.length - 1) throw new Error('cannot down bottom element');
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }

    static copyFile3(source: fs.PathLike, target: fs.PathLike): Promise<void> {
        return new Promise((resolve, reject) => {
            const rd = fs.createReadStream(source);
            rd.on('error', (err) => {
                reject(err);
            });
            const wr = fs.createWriteStream(target);
            wr.on('error', (err) => {
                reject(err);
            });
            wr.on('close', () => {
                resolve();
            });
            rd.pipe(wr);
        });
    }

    static async exists2(path: fs.PathLike): Promise<boolean> {
        try {
            await access(path);
            return true;
        } catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            } else {
                throw err;
            }
        }
    }

    static writeFile(filePath: string, content: string): Promise<void> {
        debug(colors.blue('BkHelper.writeFile'), filePath);
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, 'utf8', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static writeFileSync(filePath: string, content: string) {
        debug(colors.blue('BkHelper.writeFileSync'), filePath /* , content */);
        return fs.writeFileSync(filePath, content, 'utf8');
    }

    static async writeFile2(filePath: string, content: string) {
        const dirPath = BkHelper.getDirPath(filePath);
        await BkHelper.createDirIfNotExists2(dirPath);
        return await BkHelper.writeFile(filePath, content);
    }

    static mapObject(object: any, cb: any) {
        return Object.keys(object).reduce((obj: any, key) => {
            const [newKey, newVal] = cb(key, object[key]) as [string, any];
            obj[newKey] = newVal;
            return obj;
        }, {});
    }

    static fsUnlink(filePath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
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

    static dateTimeReviver(key: any, value: string | number | Date) {
        if (typeof value === 'string') {
            const a =
                /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?(Z|([+-])(\d{2}):(\d{2}))?$/.exec(
                    value,
                );
            if (a) return new Date(value);
        }
        return value;
    }

    static decodeValue(rawValue: JSONString): any {
        if (rawValue === undefined) throw new Error('decodeValue: undefined');
        if (rawValue === null) throw new Error('decodeValue: null');
        if (rawValue === '') throw new Error('decodeValue: empty string');
        try {
            return JSON.parse(rawValue, BkHelper.dateTimeReviver);
        } catch (err) {
            throw new Error(`decodeValue failed: ${err.message}, raw: "${rawValue}"`);
        }
    }

    static encodeValue(value: any): JSONString {
        return JSON.stringify(value) as JSONString;
    }

    static decodeObject(obj: any): Record<string, any> {
        const dObj: any = {};
        for (const name in obj) {
            if (typeof obj[name] !== 'string')
                throw new Error(`cannot decode: ${name}, type: ${typeof obj[name]}`);
            dObj[name] = BkHelper.decodeValue(obj[name]);
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
        return format.replace(/\{([\w.]+)\}/g, (text, name: string) =>
            // @ts-ignore
            values[name] ? values[name] : text,
        );
    }

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
