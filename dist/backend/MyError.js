"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(options) {
        super(options.message);
        this.context = options.context;
        this.status = options.status;
        this.data = options.data;
    }
}
exports.HttpError = HttpError;
