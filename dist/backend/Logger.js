"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// import fetch from 'node-fetch';
const BkPostgreSqlDatabase_1 = require("./viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase");
class Logger {
    constructor(logErrorUrl, log) {
        this.logErrorUrl = logErrorUrl;
        if (log) {
            this.logPool = BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.createPool(log);
        }
    }
    getLogErrorUrl() {
        return this.logErrorUrl;
    }
    async createLog(values) {
        // console.log('BackHostApp.createLog', values);
        if (values.stack === undefined)
            values.stack = null;
        if (values.created === undefined)
            values.created = new Date();
        if (values.message && values.message.length > 255) {
            // throw new Error(`message to long: ${values.message.length}`);
            values.message = values.message.substr(0, 255);
        }
        await BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.queryResult(this.logPool, 'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})', values);
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
