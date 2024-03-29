export interface EventLogOptions {
    db?: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
    url?: string;
}
export interface EVEvent {
    type: 'log' | 'warn' | 'error';
    source: 'client' | 'server';
    message: string;
    stack?: string;
    data?: string;
    ip?: string;
}
export declare class EventLog {
    private pool?;
    private url?;
    constructor(options?: EventLogOptions);
    private create;
    log(event: EVEvent): Promise<string | null | undefined>;
    private logToEventLog;
}
