import Context from './Context';

class MyError extends Error {
    context: Context;
    status: number;
    data: any;
    constructor(options) {
        if (!options.message) throw new Error('MyError: no message');
        super(options.message);
        this.status  = options.status || 500;
        this.data    = options.data;
        this.context = options.context;
    }
}

export = MyError;
