import { Context } from './Context';
export declare class HttpError extends Error {
    route?: string;
    status?: number;
    data?: object;
    constructor(options: {
        message: string;
        context?: Context;
        route?: string;
        status?: number;
        data?: object;
    });
}
