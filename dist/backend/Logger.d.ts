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
        type: 'log' | 'warn' | 'error';
        source: 'client' | 'server';
        ip: string;
        message: string;
        stack?: string;
        data?: object;
    }): Promise<void>;
}
