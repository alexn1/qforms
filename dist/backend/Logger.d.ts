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
    data?: string;
    ip?: string;
}
export declare class Logger {
    private pool;
    private url;
    constructor(options?: LoggerOptions);
    getUrl(): string;
    createLog(record: LogRecord): Promise<void>;
    log(record: LogRecord): Promise<void>;
}
