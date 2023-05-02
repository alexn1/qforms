"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlDataSource = void 0;
const PersistentDataSource_1 = require("../PersistentDataSource");
const Helper_1 = require("../../../../../common/Helper");
class NoSqlDataSource extends PersistentDataSource_1.PersistentDataSource {
}
exports.NoSqlDataSource = NoSqlDataSource;
Helper_1.Helper.registerGlobalClass(NoSqlDataSource);
