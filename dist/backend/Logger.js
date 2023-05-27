"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// import fetch from 'node-fetch';
const BkPostgreSqlDatabase_1 = require("./viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase");
class Logger {
    constructor(logErrorUrl, log) {
        this.logErrorUrl = logErrorUrl;
        this.logPool = log && BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.createPool(log);
    }
    getLogErrorUrl() {
        return this.logErrorUrl;
    }
    async createLog(values) {
        // console.log('BackHostApp.createLog', values);
        await BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.queryResult(this.logPool, 'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})', {
            created: new Date(),
            type: values.type,
            source: values.source,
            ip: values.ip,
            message: values.message && values.message.substring(0, 255),
            stack: values.stack || null,
            data: values.data || null,
        });
    }
    async log(values) {
        if (this.logPool) {
            await this.createLog({
                type: values.type,
                source: values.source,
                ip: values.ip,
                message: values.message,
                stack: values.stack || null,
                data: values.data ? JSON.stringify(values.data, null, 4) : null,
            });
        }
        else if (this.logErrorUrl) {
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
}
exports.Logger = Logger;
