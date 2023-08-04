import { JSONString, Scalar } from '../../types';
import { ReactComponent } from './ReactComponent';
export declare class Helper {
    static formatDate(date: any, format: any): any;
    static formatNumber(value: number): string;
    static today(): Date;
    static getStartOfDay(date: Date): Date;
    static encodeObject(obj: Record<string, any>): Record<string, JSONString>;
    static encodeValue(value: any): JSONString;
    static decodeObject(eObj: Record<string, JSONString>): any;
    static decodeValue(raw: JSONString): any;
    static dateTimeReviver(key: string, value: any): any;
    static createReactComponent(rootElement: Element, type: any, props?: {}, children?: any): ReactComponent | undefined;
    static createReactComponent2(rootElement: Element, type: any, props?: {}, children?: any): ReactComponent | undefined;
    static destroyReactComponent(root: any): void;
    static readFileAsDataURL(file: Blob): Promise<string | ArrayBuffer | null>;
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
    static setCookie(name: string, value: Scalar, time: number): void;
    static getCookie(name: string): string | undefined;
    static eraseCookie(name: string): void;
    static delay(ms?: number): Promise<unknown>;
    static registerGlobalClass(Class: any): void;
    static getGlobalClass(className: string): any;
    static addClassToDocumentElement(className: any): void;
}
