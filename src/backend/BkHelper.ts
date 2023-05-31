import fs from 'fs';
import glob from 'glob';
import path from 'path';
import slash from 'slash';
import colors from 'colors/safe';

import { JSONString } from '../types';
import { EmptyPromise } from './EmptyPromise';

function _getFilePathsSync(dirPath: string, ext: string) {
    const filePaths = glob.sync(path.join(dirPath, '*.' + ext));
    glob.sync(path.join(dirPath, '*/')).forEach((subDirPath) => {
        _getFilePathsSync(subDirPath, ext).forEach((fileName) => {
            filePaths.push(fileName);
        });
    });
    return filePaths;
}

async function _getFilePaths2(dirPath, ext, filePaths) {
    // console.log('_getFilePaths2', dirPath);
    // all files from directory
    const files = await BkHelper._glob(path.join(dirPath, '*.' + ext));

    // pushing files to output array
    files.forEach((item) => {
        filePaths.push(item);
    });
    // all directories from directory
    const dirs = await BkHelper._glob(path.join(dirPath, '*/'));

    // for each dir push files to output array
    for (let i = 0; i < dirs.length; i++) {
        const subDirPath = dirs[i];
        await _getFilePaths2(subDirPath, ext, filePaths);
    }
}

export class BkHelper {
    static getRandomString(length) {
        function getRandomInt(min, max) {
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

    static getFilePathsSync(publicDirPath, subDirPath, ext) {
        return _getFilePathsSync(path.join(publicDirPath, subDirPath), ext).map((filePath) => {
            return slash(path.relative(publicDirPath, filePath));
        });
    }

    static _glob(path): Promise<any[]> {
        return new Promise((resolve, reject) => {
            glob(path, (err, items) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(items);
                }
            });
        });
    }

    static async getFilePaths(dirPath, ext): Promise<string[]> {
        // console.log('BkHelper.getFilePaths');
        const filePaths = [];
        await _getFilePaths2(dirPath, ext, filePaths);
        const relativeFilePaths = filePaths.map((filePath) => {
            return slash(path.relative(dirPath, filePath));
        });
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

        /*
        let hh = now.getHours();
        let mm = now.getMinutes();
        let ss = now.getSeconds();

        let _hh = hh.toString();
        let _mm = mm.toString();
        let _ss = ss.toString();

        if (hh < 10) _hh = '0' + _hh;
        if (mm < 10) _mm = '0' + mm;
        if (ss < 10) _ss = '0' + ss;


        return [_hh, _mm, _ss].join(':');*/
        return arrS.join(':');
    }

    /* static currentDate() {
        const now = new Date();
        let dd   = now.getDate();      if (dd < 10) dd = '0' + dd;
        let mm   = now.getMonth() + 1; if (mm < 10) mm = '0' + mm;   /!*January is 0!*!/
        const yyyy = now.getFullYear();
        return [yyyy, mm, dd].join('-');
    } */

    /* static currentDateTime() {
        return BkHelper.currentDate() + ' ' + BkHelper.currentTime();
    } */

    static templateToJsString(value, params) {
        return value.replace(/\$\{([\w.@]+)\}/g, (text, name) => {
            if (Object.prototype.hasOwnProperty.call(params, name)) {
                return `BkHelper.decodeValue('${BkHelper.encodeValue(params[name])}')`;
            }
            return 'undefined';
        });
    }

    /* static replaceKey(obj, key1, key2) {
        const keys   = Object.keys(obj);
        const values = _.filter(obj, () => {return true;});
        const index  = keys.indexOf(key1);
        if (index !== -1) {
            keys[index] = key2;
            obj = _.object(keys, values);
        }
        return obj;
    } */

    static readTextFile(path): Promise<string> {
        // console.log(colors.blue('BkHelper.readTextFile'), path);
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

    static async getFileContent(filePath) {
        if (await BkHelper.exists(filePath)) {
            return BkHelper.readTextFile(filePath);
        }
        return null;
    }
    static getFileContentSync(filePath) {
        // console.log(colors.blue('BkHelper.getFileContentSync'), filePath);
        if (!fs.existsSync(filePath)) {
            return null;
        }
        return fs.readFileSync(filePath, 'utf8');
    }

    static readBinaryFile(filePath) {
        console.log(colors.blue('BkHelper.readBinaryFile'), filePath);
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

    static createPath(arr) {
        if (arr.length === 0) throw new Error('no path elements');
        if (arr.length === 1) return '/';
        return arr.join('/');
    }

    static getDirPath(filePath) {
        const arr = filePath.split('/');
        return BkHelper.createPath(arr.slice(0, arr.length - 1));
    }

    static async createDirIfNotExists2(originalDirPath) {
        // console.log('BkHelper.createDirIfNotExists2', originalDirPath);
        const arr = originalDirPath.split('/');
        for (let i = 1; i <= arr.length; i++) {
            const dirPath = BkHelper.createPath(arr.slice(0, i));
            const exists = await BkHelper.exists(dirPath);
            // console.log('dirPath', i, dirPath, exists);
            if (!exists) {
                await BkHelper.createDirIfNotExists(dirPath);
            }
        }
    }

    static createDirIfNotExists(dirPath): Promise<void> {
        console.log(colors.blue('BkHelper.createDirIfNotExists'), dirPath);
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

    static createDirIfNotExistsSync(dirPath) {
        // console.log(colors.blue('BkHelper.createDirIfNotExistsSync'), dirPath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    }

    /* static moveObjProp(obj, prop, offset) {
        const keys     = _.keys(obj);
        const values   = _.values(obj);
        const oldIndex = keys.indexOf(prop);
        if (oldIndex === -1) {
            throw new Error('cannot find element');
        }
        const newIndex = oldIndex + offset;
        if (newIndex < 0) {
            throw new Error('cannot up top element');
        }
        if (newIndex > values.length - 1) {
            throw new Error('cannot down bottom element');
        }
        keys.splice(newIndex, 0,   keys.splice(oldIndex, 1)[0]);
        values.splice(newIndex, 0, values.splice(oldIndex, 1)[0]);
        return _.object(keys, values);
    } */

    static moveArrItem(arr, item, offset) {
        const oldIndex = arr.indexOf(item);
        if (oldIndex === -1) throw new Error('cannot find element');
        const newIndex = oldIndex + offset;
        if (newIndex < 0) throw new Error('cannot up top element');
        if (newIndex > arr.length - 1) throw new Error('cannot down bottom element');
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }

    /* static getTempSubDirPath3(tempDirPath) {
        return new Promise((resolve, reject) => {
            const subDirName = BkHelper.getRandomString(8);
            const tempSubSirPath = path.join(tempDirPath, subDirName);
            fs.exists(tempSubSirPath, exists => {
                if (!exists) {
                    fs.mkdir(tempSubSirPath, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(tempSubSirPath);
                        }
                    });
                } else {
                    BkHelper.getTempSubDirPath(tempDirPath, () => {
                        resolve();
                    });
                }
            });
        });
    } */

    static copyFile3(source, target): Promise<void> {
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

    static exists(path): Promise<boolean> {
        // console.log(colors.blue('BkHelper.exists'), path);
        return new Promise((resolve) => {
            fs.exists(path, (exists) => {
                resolve(exists);
            });
        });
    }

    static writeFile(filePath: string, content): Promise<void> {
        console.log(colors.blue('BkHelper.writeFile'), filePath);
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
    static writeFileSync(filePath, content) {
        console.log(colors.blue('BkHelper.writeFileSync'), filePath /* , content */);
        return fs.writeFileSync(filePath, content, 'utf8');
    }

    static async writeFile2(filePath, content) {
        const dirPath = BkHelper.getDirPath(filePath);
        await BkHelper.createDirIfNotExists2(dirPath);
        return await BkHelper.writeFile(filePath, content);
    }

    static mapObject(object, cb) {
        return Object.keys(object).reduce((obj, key) => {
            const [newKey, newVal] = cb(key, object[key]);
            obj[newKey] = newVal;
            return obj;
        }, {});
    }

    static fsUnlink(filePath): Promise<void> {
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

    // timeOffset number in minutes
    static today(timeOffset) {
        // console.log('BkHelper.today', timeOffset);
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

    static dateTimeReviver(key, value) {
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
        if (rawValue === undefined) throw new Error('decodeValue undefined');
        if (rawValue === null) throw new Error('decodeValue null');
        try {
            return JSON.parse(rawValue, BkHelper.dateTimeReviver);
        } catch (err) {
            throw new Error(`decodeValue failed: ${rawValue}`);
        }
    }

    static encodeValue(value: any): JSONString {
        return JSON.stringify(value) as JSONString;
    }

    static decodeObject(obj): any {
        const dObj = {};
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

    static Session_save(session): Promise<void> {
        return new Promise((resolve, reject) => {
            session.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static addMinutes(date: Date, minutes: number): void {
        // console.log('BkHelper.addMinutes', date, minutes);
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
        return format.replace(/\{([\w.]+)\}/g, (text, name) =>
            values[name] ? values[name] : text,
        );
    }

    static getFirstField(object: Object) {
        const [key] = Object.keys(object);
        if (!key) throw new Error('getFirstField: no fields');
        return object[key];
    }

    static getCommandLineParams() {
        return process.argv
            .map((arg) => arg.split('='))
            .reduce((acc, [name, value]) => {
                acc[name] = value;
                return acc;
            }, {});
    }

    static getWebSocketIP(webSocket) {
        return webSocket.upgradeReq.headers['x-real-ip']
            ? webSocket.upgradeReq.headers['x-real-ip']
            : webSocket.upgradeReq.socket.remoteAddress;
    }

    static getWebSocketPort(webSocket) {
        return webSocket.upgradeReq.headers['x-real-port']
            ? webSocket.upgradeReq.headers['x-real-port']
            : webSocket.upgradeReq.socket.remotePort;
    }

    static templateArray(arr) {
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

    /* static createEmptyPromise<T = any>(): EmptyPromise<T> {
        let _resolve, _reject;
        const promise = new EmptyPromise<T>(function (resolve, reject) {
            _resolve = resolve;
            _reject = reject;
        });
        promise.resolve = _resolve;
        promise.reject = _reject;
        return promise;
    } */

    static test() {
        console.log('BkHelper.test');
    }

    static formatNumber(value: number) {
        return new Intl.NumberFormat('ru-RU').format(value);
    }

    static formatTime2(_sec) {
        // console.log('BkHelper.formatTime', sec);
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

    static registerGlobalClass(Class) {
        // console.log('BkHelper.registerGlobalClass', Class.name);
        if (global[Class.name]) throw new Error(`global.${Class.name} already used`);
        global[Class.name] = Class;
    }

    static getContentFromDataUrl(value: string): [contentType: string, buffer: Buffer] {
        const [type, data] = value.split(';');
        const contentType = type.split(':')[1];
        const base64string = data.split(',')[1];
        // console.log('base64string:', base64string);
        const buffer = Buffer.from(base64string, 'base64');
        return [contentType, buffer];
    }
}

// @ts-ignore
global.BkHelper = BkHelper;
