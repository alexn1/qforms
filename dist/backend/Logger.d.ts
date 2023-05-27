import { Pool } from 'pg';
export declare class Logger {
    private logPool;
    constructor(logErrorUrl: string, logPool: Pool);
}
