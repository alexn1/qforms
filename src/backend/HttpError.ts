import { Context } from './Context';

export class HttpError extends Error {
    route?: string;
    status?: number;
    data?: object;

    constructor(options: {
        message: string;
        context?: Context;
        route?: string;
        status?: number;
        data?: object;
    }) {
        super(options.message);
        this.route = options.route;
        this.status = options.status;
        this.data = options.data;
    }
}
