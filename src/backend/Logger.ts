import { Pool } from 'pg';
// import fetch from 'node-fetch';
import { BkPostgreSqlDatabase } from './viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase';

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

export class Logger {
    private logPool: Pool;

    constructor(
        private logErrorUrl: string,
        log?: {
            host: string;
            port: number;
            database: string;
            user: string;
            password: string;
        },
    ) {
        this.logPool = log && BkPostgreSqlDatabase.createPool(log);
    }

    getLogErrorUrl() {
        return this.logErrorUrl;
    }

    async createLog(values: LogRow) {
        // console.log('BackHostApp.createLog', values);
        await BkPostgreSqlDatabase.queryResult(
            this.logPool,
            'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})',
            {
                created: new Date(),
                type: values.type,
                source: values.source,
                ip: values.ip,
                message: values.message && values.message.substring(0, 255),
                stack: values.stack || null,
                data: values.data || null,
            },
        );
    }

    async log(values: LogRecord) {
        if (this.logPool) {
            await this.createLog({
                type: values.type,
                source: values.source,
                ip: values.ip,
                message: values.message,
                stack: values.stack || null,
                data: values.data ? JSON.stringify(values.data, null, 4) : null,
            });
        } else if (this.logErrorUrl) {
            console.log(`fetch ${this.logErrorUrl}`);
            await fetch(this.logErrorUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: values.type,
                    source: values.source,
                    ip: values.ip,
                    message: values.message,
                    stack: values.stack || null,
                    data: values.data || null,
                }),
            });
        }
    }

    /* async createLog2(values: {
        type: string;
        source: string;
        ip: string;
        message: string;
        data: object;
    }) {
        if (this.logPool) {
            await this.createLog({
                type: values.type,
                source: values.source,
                ip: values.ip,
                message: values.message,
                data: values.data ? JSON.stringify(values.data, null, 4) : null,
            });
        } else if (this.logErrorUrl) {
            console.log(`fetch ${this.logErrorUrl}`);
            await fetch(this.logErrorUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: values.type,
                    source: values.source,
                    ip: values.ip,
                    message: values.message,
                    data: values.data,
                }),
            });
        }
    } */
}
