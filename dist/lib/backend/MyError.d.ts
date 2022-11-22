import Context from './Context';
declare class MyError extends Error {
    context: Context;
    status: number;
    data: any;
    constructor(options: any);
}
export = MyError;
