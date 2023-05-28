"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyPromise = void 0;
class EmptyPromise extends Promise {
    static create() {
        let _resolve, _reject;
        const promise = new EmptyPromise(function (resolve, reject) {
            _resolve = resolve;
            _reject = reject;
        });
        promise.resolve = _resolve;
        promise.reject = _reject;
        return promise;
    }
}
exports.EmptyPromise = EmptyPromise;
