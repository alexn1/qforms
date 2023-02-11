"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlDatabase = void 0;
const Database_1 = require("../Database");
class NoSqlDatabase extends Database_1.Database {
    async updateOne(context, colName, filter, update) {
        throw new Error(`${this.constructor.name}.updateOne not implemented`);
    }
}
exports.NoSqlDatabase = NoSqlDatabase;
