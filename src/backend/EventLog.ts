import { Pool } from 'pg';
import fetch from 'node-fetch';
import { BkPostgreSqlDatabase } from './viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase';

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

export interface Event {
    type: 'log' | 'warn' | 'error';
    source: 'client' | 'server';
    message: string;
    stack?: string;
    data?: string;
    ip?: string;
}

export class EventLog {
    private pool: Pool;
    private url: string;

    constructor(options?: EventLogOptions) {
        this.pool = options?.db && BkPostgreSqlDatabase.createPool(options.db);
        this.url = options?.url;
    }

    public getUrl() {
        return this.url;
    }

    private async create(event: Event) {
        // console.log('EventLog.create', event);
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

    public async log(event: Event) {
        if (this.pool) {
            await this.create(event);
        } else if (this.url) {
            console.log(`fetch ${this.url}`);
            await fetch(this.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event),
            });
        }
    }
}