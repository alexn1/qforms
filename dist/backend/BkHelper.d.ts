/// <reference types="node" />
export declare class BkHelper {
    static moveArrItem(arr: any[], item: any, offset: number): void;
    static mapObject(object: any, cb: any): any;
    static fillArray(n: number): number[];
    static argvAsKeyValue(argv: string[], slice?: number): Record<string, string>;
    static templateArray(arr: any[]): any[];
    static registerGlobalClass(Class: any): void;
    static getContentFromDataUrl(value: string): [contentType: string, buffer: Buffer];
    static post(url: string, data: any): Promise<any>;
}
