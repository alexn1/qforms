"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const BkPostgreSqlDatabase_1 = require("./viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase");
class Logger {
    constructor(logErrorUrl, logPool) {
        this.logPool = logPool;
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
}
exports.Logger = Logger;
