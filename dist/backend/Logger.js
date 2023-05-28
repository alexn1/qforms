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
    async insertLog(record) {
        // console.log('BackHostApp.insertLog', values);
        await BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.queryResult(this.pool, 'insert into log(created, type, source, message, stack, data, ip) values ({created}, {type}, {source}, {message}, {stack}, {data}, {ip})', {
            created: new Date(),
            type: record.type,
            source: record.source,
            message: record.message && record.message.substring(0, 255),
            stack: record.stack || null,
            data: record.data || null,
            ip: record.ip || null,
        });
    }
    async log(record) {
        if (this.pool) {
            await this.insertLog(record);
        }
        else if (this.url) {
            console.log(`fetch ${this.url}`);
            await fetch(this.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record),
            });
        }
    }
}
exports.Logger = Logger;
