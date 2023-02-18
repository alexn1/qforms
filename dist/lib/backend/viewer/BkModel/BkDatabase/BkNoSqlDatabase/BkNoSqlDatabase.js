"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkNoSqlDatabase = void 0;
const BkDatabase_1 = require("../BkDatabase");
class BkNoSqlDatabase extends BkDatabase_1.BkDatabase {
    async updateOne(context, colName, filter, update) {
        throw new Error(`${this.constructor.name}.updateOne not implemented`);
    }
    async insertOne(context, colName, document) {
        throw new Error(`${this.constructor.name}.insertOne not implemented`);
    }
}
exports.BkNoSqlDatabase = BkNoSqlDatabase;
