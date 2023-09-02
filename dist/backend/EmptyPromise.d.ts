export type Resolve<T = any> = (value: T | PromiseLike<T>) => void;
export type Reject = (reason?: any) => void;
export declare class EmptyPromise<T = any> extends Promise<T> {
    resolve: Resolve<T>;
    reject: Reject;
    constructor();
}
