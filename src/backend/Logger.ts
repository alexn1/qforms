import { Pool } from 'pg';
// import fetch from 'node-fetch';
import { BkPostgreSqlDatabase } from './viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase';

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

export class Logger {
    private pool: Pool;
    private url: string;

    constructor(options?: LoggerOptions) {
        this.pool = options?.db && BkPostgreSqlDatabase.createPool(options.db);
        this.url = options?.url;
    }

    getUrl() {
        return this.url;
    }

    async insertLog(record: LogRecord) {
        // console.log('BackHostApp.insertLog', values);
        await BkPostgreSqlDatabase.queryResult(
            this.pool,
            'insert into log(created, type, source, message, stack, data, ip) values ({created}, {type}, {source}, {message}, {stack}, {data}, {ip})',
            {
                created: new Date(),
                type: record.type,
                source: record.source,
                message: record.message && record.message.substring(0, 255),
                stack: record.stack || null,
                data: record.data || null,
                ip: record.ip || null,
            },
        );
    }

    async log(record: LogRecord) {
        if (this.pool) {
            await this.insertLog(record);
        } else if (this.url) {
            console.log(`fetch ${this.url}`);
            await fetch(this.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record),
            });
        }
    }
}
