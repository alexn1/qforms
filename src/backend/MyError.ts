import { Context } from './Context';

export class MyError extends Error {
    context?: Context;
    status?: number;
    data?: object;

    constructor(options: { message: string; context?: Context; status?: number; data?: object }) {
        super(options.message);
        this.context = options.context;
        this.status = options.status;
        this.data = options.data;
    }
}
