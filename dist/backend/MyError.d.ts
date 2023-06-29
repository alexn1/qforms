import { Context } from './Context';
export declare class MyError extends Error {
    context?: Context;
    status?: number;
    data?: object;
    constructor(options: {
        message: string;
        context?: Context;
        status?: number;
        data?: object;
    });
}
