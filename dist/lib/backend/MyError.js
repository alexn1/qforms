"use strict";
class MyError extends Error {
    constructor(options) {
        if (!options.message)
            throw new Error('MyError: no message');
        super(options.message);
        this.status = options.status;
        this.data = options.data;
        this.context = options.context;
    }
}
module.exports = MyError;
