/// <reference types="node" />
export declare class BkHelper {
    static templateToJsString(value: string, params: Record<string, any>): string;
    static moveArrItem(arr: any[], item: any, offset: number): void;
    static mapObject(object: any, cb: any): any;
    static today(timeOffset: number): Date;
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
    static getFirstField(object: any): any;
    static argvAsKeyValue(argv: string[], slice?: number): Record<string, string>;
    static templateArray(arr: any[]): any[];
    static formatNumber(value: number): string;
    static formatTime2(_sec: number): string;
    static registerGlobalClass(Class: any): void;
    static getContentFromDataUrl(value: string): [contentType: string, buffer: Buffer];
    static post(url: string, data: any): Promise<any>;
}
