/// <reference types="node" />
export declare class BkHelper {
    static argvAsKeyValue(argv: string[], slice?: number): Record<string, string>;
    static registerGlobalClass(Class: any): void;
    static getContentFromDataUrl(value: string): [contentType: string, buffer: Buffer];
    static post(url: string, data: any): Promise<any>;
}
