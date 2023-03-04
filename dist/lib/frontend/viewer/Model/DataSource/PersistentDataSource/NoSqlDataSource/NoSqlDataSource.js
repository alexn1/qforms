"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlDataSource = void 0;
const PersistentDataSource_1 = require("../PersistentDataSource");
class NoSqlDataSource extends PersistentDataSource_1.PersistentDataSource {
}
exports.NoSqlDataSource = NoSqlDataSource;
if (typeof window === 'object') {
    // @ts-ignore
    window.NoSqlDataSource = NoSqlDataSource;
}
