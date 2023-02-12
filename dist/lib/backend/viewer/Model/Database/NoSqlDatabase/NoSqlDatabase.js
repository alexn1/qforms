"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkNoSqlDatabase = void 0;
const Database_1 = require("../Database");
class BkNoSqlDatabase extends Database_1.BkDatabase {
    async updateOne(context, colName, filter, update) {
        throw new Error(`${this.constructor.name}.updateOne not implemented`);
    }
}
exports.BkNoSqlDatabase = BkNoSqlDatabase;
