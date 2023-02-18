import { JSONString } from '../../types';
export declare class Helper {
    static formatDate(date: any, format: any): any;
    static formatNumber(value: any): string;
    static today(): Date;
    static getStartOfDay(date: any): Date;
    static encodeObject(obj: any): {};
    static encodeValue(value: any): JSONString;
    static decodeObject(eObj: any): any;
    static decodeValue(raw: JSONString): any;
    static dateTimeReviver(key: any, value: any): any;
    static createReactComponent(rootElement: any, type: any, props?: {}, children?: any): any;
    static destroyReactComponent(root: any): void;
    static readFileAsDataURL(file: any): Promise<unknown>;
    static templateToJsString(value: any, params: any): any;
    static moveArrItem(arr: any, item: any, offset: any): void;
    static formatTime(_sec: any): string;
    static formatTime2(_sec: any): string;
    static SECOND(): number;
    static MINUTE(): number;
    static HOUR(): number;
    static DAY(): number;
    static WEEK(): number;
    static fallbackCopyTextToClipboard(text: any): void;
    static copyTextToClipboard(text: any): Promise<void>;
    static addMinutes(date: any, minutes: any): void;
    static removeTimezoneOffset(date: Date): void;
    static addTimezoneOffset(date: any): void;
    static cloneDate(date: Date): Date;
    static fillArray(n: number): number[];
    static inIframe(): boolean;
    static setCookie(name: string, value: string | number | boolean, time: number): void;
    static getCookie(name: string): string | undefined;
    static eraseCookie(name: string): void;
    static delay(ms?: number): Promise<unknown>;
}
