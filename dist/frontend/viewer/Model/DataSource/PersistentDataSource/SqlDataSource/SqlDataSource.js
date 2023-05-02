"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlDataSource = void 0;
const PersistentDataSource_1 = require("../PersistentDataSource");
const Helper_1 = require("../../../../../common/Helper");
class SqlDataSource extends PersistentDataSource_1.PersistentDataSource {
}
exports.SqlDataSource = SqlDataSource;
Helper_1.Helper.registerGlobalClass(SqlDataSource);
