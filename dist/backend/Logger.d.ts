import { Pool } from 'pg';
export declare class Logger {
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
}
