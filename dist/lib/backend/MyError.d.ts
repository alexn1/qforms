import { Context } from './Context';
export declare class MyError extends Error {
    context: Context;
    status: number;
    data: any;
    constructor(options: any);
}
