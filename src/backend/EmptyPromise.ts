import { Nullable } from '../types';

export type Resolve<T = any> = (value: T | PromiseLike<T>) => void;
export type Reject = (reason?: any) => void;

export class EmptyPromise<T = any> extends Promise<T> {
    resolve: Nullable<Resolve<T>>;
    reject: Nullable<Reject>;

    static create<T = any>(): EmptyPromise<T> {
        let _resolve: Nullable<Resolve<T>> = null;
        let _reject: Nullable<Reject> = null;
        const emptyPromise = new EmptyPromise<T>((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
        });
        emptyPromise.resolve = _resolve;
        emptyPromise.reject = _reject;
        return emptyPromise;
    }
}
