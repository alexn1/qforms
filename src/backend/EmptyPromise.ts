export type Resolve<T = any> = (value: T | PromiseLike<T>) => void;
export type Reject = (reason?: any) => void;

export class EmptyPromise<T = any> extends Promise<T> {
    resolve: Resolve<T>;
    reject: Reject;

    static create<T = any>(): EmptyPromise<T> {
        let _resolve: Resolve<T>;
        let _reject: Reject;
        const emptyPromise = new EmptyPromise<T>((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
        });
        emptyPromise.resolve = _resolve!;
        emptyPromise.reject = _reject!;
        return emptyPromise;
    }
}
