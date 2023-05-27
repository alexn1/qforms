"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// import fetch from 'node-fetch';
const BkPostgreSqlDatabase_1 = require("./viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase");
class Logger {
    constructor(options) {
        this.pool = (options === null || options === void 0 ? void 0 : options.db) && BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.createPool(options.db);
        this.url = options === null || options === void 0 ? void 0 : options.url;
    }
    getUrl() {
        return this.url;
    }
    async createLog(values) {
        // console.log('BackHostApp.createLog', values);
        await BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.queryResult(this.pool, 'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})', {
            created: new Date(),
            type: values.type,
            source: values.source,
            message: values.message && values.message.substring(0, 255),
            stack: values.stack || null,
            data: values.data || null,
            ip: values.ip || null,
        });
    }
    async log(record) {
        if (this.pool) {
            await this.createLog({
                type: record.type,
                source: record.source,
                message: record.message,
                stack: record.stack || null,
                data: record.data ? JSON.stringify(record.data, null, 4) : null,
                ip: record.ip || null,
            });
        }
        else if (this.url) {
            console.log(`fetch ${this.url}`);
            await fetch(this.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: record.type,
                    source: record.source,
                    message: record.message,
                    stack: record.stack || null,
                    data: record.data || null,
                    ip: record.ip || null,
                }),
            });
        }
    }
}
exports.Logger = Logger;
