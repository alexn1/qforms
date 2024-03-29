import { Pool } from 'pg';
import { BkPostgreSqlDatabase } from './viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase';
import { BkHelper } from './BkHelper';

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

export class EventLog {
    private pool?: Pool;
    private url?: string;

    constructor(options?: EventLogOptions) {
        this.pool = options?.db && BkPostgreSqlDatabase.createPool(options.db);
        this.url = options?.url;
    }

    private async create(event: EVEvent) {
        // debug('EventLog.create', event);
        if (!this.pool) throw new Error('no pool');
        await BkPostgreSqlDatabase.queryResult(
            this.pool,
            'insert into log(created, type, source, message, stack, data, ip) values ({created}, {type}, {source}, {message}, {stack}, {data}, {ip})',
            {
                created: new Date(),
                type: event.type,
                source: event.source,
                message: event.message && event.message.substring(0, 255),
                stack: event.stack || null,
                data: event.data || null,
                ip: event.ip || null,
            },
        );
    }

    public async log(event: EVEvent) {
        if (this.pool) {
            await this.create(event);
        }
        if (this.url) {
            const eventId = await this.logToEventLog(event);
            return eventId;
        }
    }

    private async logToEventLog(event: any): Promise<string | null> {
        if (!this.url) throw new Error('no url');
        try {
            const { _id } = await BkHelper.post(this.url, event);
            return _id;
        } catch (err) {
            return null;
        }
    }
}
