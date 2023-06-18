"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLog = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const BkPostgreSqlDatabase_1 = require("./viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase");
class EventLog {
    constructor(options) {
        this.pool = (options === null || options === void 0 ? void 0 : options.db) && BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.createPool(options.db);
        this.url = options === null || options === void 0 ? void 0 : options.url;
    }
    getUrl() {
        return this.url;
    }
    async insert(event) {
        // console.log('BackHostApp.insertLog', event);
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
            await this.insert(event);
        }
        else if (this.url) {
            console.log(`fetch ${this.url}`);
            await (0, node_fetch_1.default)(this.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event),
            });
        }
    }
}
exports.EventLog = EventLog;
