import { Pool } from 'pg';
export declare class Logger {
    private logPool;
    constructor(logErrorUrl: string, logPool: Pool);
    static createLog(cnn: any, values: any): Promise<void>;
}
