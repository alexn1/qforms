"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLog = void 0;
const BkPostgreSqlDatabase_1 = require("./viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase");
const BkHelper_1 = require("./BkHelper");
class EventLog {
    constructor(options) {
        this.pool = (options === null || options === void 0 ? void 0 : options.db) && BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.createPool(options.db);
        this.url = options === null || options === void 0 ? void 0 : options.url;
    }
    async create(event) {
        // console.log('EventLog.create', event);
        await BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.queryResult(this.pool, 'insert into log(created, type, source, message, stack, data, ip) values ({created}, {type}, {source}, {message}, {stack}, {data}, {ip})', {
            created: new Date(),
            type: event.type,
            source: event.source,
            message: event.message && event.message.substring(0, 255),
            stack: event.stack || null,
            data: event.data || null,
            ip: event.ip || null,
        });
    }
    async log(event) {
        if (this.pool) {
            await this.create(event);
        }
        if (this.url) {
            const eventId = await this.logToEventLog(event);
            return eventId;
        }
    }
    async logToEventLog(event) {
        try {
            const { _id } = await BkHelper_1.BkHelper.post(this.url, event);
            return _id;
        }
        catch (err) {
            return null;
        }
    }
}
exports.EventLog = EventLog;
