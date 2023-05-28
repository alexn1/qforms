export class EmptyPromise<T> extends Promise<T> {
    resolve: any;
    reject: any;

    static create<T = any>(): EmptyPromise<T> {
        let _resolve, _reject;
        const promise = new EmptyPromise<T>(function (resolve, reject) {
            _resolve = resolve;
            _reject = reject;
        });
        promise.resolve = _resolve;
        promise.reject = _reject;
        return promise;
    }
}
