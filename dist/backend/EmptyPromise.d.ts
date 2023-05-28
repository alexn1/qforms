export declare class EmptyPromise<T> extends Promise<T> {
    resolve: any;
    reject: any;
    static create<T = any>(): EmptyPromise<T>;
}
