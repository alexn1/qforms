export type Resolve<T = any> = (value: T | PromiseLike<T>) => void;
export type Reject = (reason?: any) => void;

export class EmptyPromise<T = any> extends Promise<T> {
    resolve: Resolve<T>;
    reject: Reject;

    constructor() {
        super((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
