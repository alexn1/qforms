"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyError = void 0;
class MyError extends Error {
    constructor(options) {
        super(options.message);
        this.context = options.context;
        this.status = options.status;
        this.data = options.data;
    }
}
exports.MyError = MyError;
