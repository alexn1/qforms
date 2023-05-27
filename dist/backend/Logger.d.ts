export interface LoggerOptions {
    db?: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
    url?: string;
}
export interface LogRecord {
    type: 'log' | 'warn' | 'error';
    source: 'client' | 'server';
    message: string;
    stack?: string;
    data?: object;
    ip?: string;
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
    private pool;
    private url;
    constructor(options?: LoggerOptions);
    getLogErrorUrl(): string;
    createLog(values: LogRow): Promise<void>;
    log(record: LogRecord): Promise<void>;
}
