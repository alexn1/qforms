import Context from './Context';

class MyError extends Error {
    context: Context;
    status: number;
    data: any;
}

export = MyError;
