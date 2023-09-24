/// <reference types="node" />
/// <reference types="node" />
import fs from 'fs';
import { JSONString } from '../types';
export declare class BkHelper {
    static getRandomString(length: number): string;
    static getFilePathsSync(publicDirPath: string, subDirPath: string, ext: string): string[];
    static getFilePaths(dirPath: string, ext: string): Promise<string[]>;
    static currentTime(): string;
    static templateToJsString(value: string, params: Record<string, any>): string;
    static readTextFile(path: string): Promise<string>;
    static getFileContent(filePath: string): Promise<string | null>;
    static getFileContentSync(filePath: string): string | null;
    static readBinaryFile(filePath: string): Promise<unknown>;
    static createPath(arr: string[]): string;
    static getDirPath(filePath: string): string;
    static createDirIfNotExists2(originalDirPath: string): Promise<void>;
    static createDirIfNotExists(dirPath: string): Promise<void>;
    static createDirIfNotExistsSync(dirPath: string): void;
    static moveArrItem(arr: any[], item: any, offset: number): void;
    static copyFile3(source: fs.PathLike, target: fs.PathLike): Promise<void>;
    static exists2(path: fs.PathLike): Promise<boolean>;
    static writeFile(filePath: string, content: string): Promise<void>;
    static writeFileSync(filePath: string, content: string): void;
    static writeFile2(filePath: string, content: string): Promise<void>;
    static mapObject(object: any, cb: any): any;
    static fsUnlink(filePath: string): Promise<void>;
    static today(timeOffset: number): Date;
    static dateTimeReviver(key: any, value: string | number | Date): string | number | Date;
    static decodeValue(rawValue: JSONString): any;
    static encodeValue(value: any): JSONString;
    static decodeObject(obj: any): Record<string, any>;
    static SECOND(): number;
    static MINUTE(): number;
    static HOUR(): number;
    static DAY(): number;
    static WEEK(): number;
    static addMinutes(date: Date, minutes: number): void;
    static removeTimezoneOffset(date: Date): void;
    static addTimezoneOffset(date: Date): void;
    static cloneDate(date: Date): Date;
    static fillArray(n: number): number[];
    static formatDate(date: Date, format: string): string;
    static getFirstField(object: any): any;
    static argvAsKeyValue(argv: string[], slice?: number): Record<string, string>;
    static getWebSocketIP(webSocket: any): any;
    static getWebSocketPort(webSocket: any): any;
    static templateArray(arr: any[]): any[];
    static formatNumber(value: number): string;
    static formatTime2(_sec: number): string;
    static registerGlobalClass(Class: any): void;
    static getContentFromDataUrl(value: string): [contentType: string, buffer: Buffer];
    static post(url: string, data: any): Promise<any>;
    static newClientId(): string;
}
