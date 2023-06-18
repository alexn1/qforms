export declare class EmptyPromise<T = any> extends Promise<T> {
    resolve: any;
    reject: any;
    static create<T = any>(): EmptyPromise<T>;
}
