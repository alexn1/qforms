import { Pool } from 'pg';
// import fetch from 'node-fetch';
import { BkPostgreSqlDatabase } from './viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase';

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
        if (log) {
            this.logPool = BkPostgreSqlDatabase.createPool(log);
        }
    }

    getLogErrorUrl() {
        return this.logErrorUrl;
    }

    async createLog(values: {
        created?: Date;
        type: string;
        source: string;
        ip: string;
        message: string;
        stack?: string;
        data: string;
    }) {
        // console.log('BackHostApp.createLog', values);
        if (values.stack === undefined) values.stack = null;
        if (values.created === undefined) values.created = new Date();
        if (values.message && values.message.length > 255) {
            // throw new Error(`message to long: ${values.message.length}`);
            values.message = values.message.substr(0, 255);
        }
        await BkPostgreSqlDatabase.queryResult(
            this.logPool,
            'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})',
            values,
        );
    }

    async log(values: {
        type: 'log' | 'warn' | 'error';
        source: 'client' | 'server';
        ip: string;
        message: string;
        stack?: string;
        data?: object;
    }) {
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
