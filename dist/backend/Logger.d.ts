export interface LogRecord {
    type: 'log' | 'warn' | 'error';
    source: 'client' | 'server';
    ip: string;
    message: string;
    stack?: string;
    data?: object;
}
export interface LogRow {
    type: 'log' | 'warn' | 'error';
    source: 'client' | 'server';
    ip: string;
    message: string;
    stack?: string;
    data?: string;
}
export declare class Logger {
    private logErrorUrl;
    private logPool;
    constructor(logErrorUrl: string, log?: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    });
    getLogErrorUrl(): string;
    createLog(values: LogRow): Promise<void>;
    log(values: LogRecord): Promise<void>;
}
