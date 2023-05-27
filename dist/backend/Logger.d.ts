import { Pool } from 'pg';
export declare class Logger {
    private logErrorUrl;
    private logPool;
    constructor(logErrorUrl: string, logPool: Pool);
    createLog(values: {
        created?: Date;
        type: string;
        source: string;
        ip: string;
        message: string;
        stack?: string;
        data: string;
    }): Promise<void>;
    log(values: {
        type: string;
        source: string;
        ip: string;
        message: string;
        stack: string;
        data: object;
    }): Promise<void>;
    createLog2(values: {
        type: string;
        source: string;
        ip: string;
        message: string;
        data: object;
    }): Promise<void>;
}
