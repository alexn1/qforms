"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    // result {
    //   insert  : {table: ["1", "2"]},
    //   insertEx: {table: {"1": {field: 1, field2: 2}}}
    //   update  : {table: {"1": "2"}},
    //   updateEx: {table: {"1": {field: 1, field2: 2}}}
    //   delete  : {table:["1", "2"]},
    // }
    static addInsertToResult(result, database, table, key) {
        if (!result[database])
            result[database] = {};
        if (!result[database][table])
            result[database][table] = {};
        if (!result[database][table].insert)
            result[database][table].insert = [];
        result[database][table].insert.push(key);
    }
    static addInsertExToResult(result, database, table, key, row) {
        if (!result[database])
            result[database] = {};
        if (!result[database][table])
            result[database][table] = {};
        if (!result[database][table].insertEx)
            result[database][table].insertEx = {};
        result[database][table].insertEx[key] = row;
    }
    static addUpdateToResult(result, database, table, oldKey, newKey) {
        // console.log('Result.addUpdateToResult');
        if (!result[database])
            result[database] = {};
        if (!result[database][table])
            result[database][table] = {};
        if (!result[database][table].update)
            result[database][table].update = {};
        result[database][table].update[oldKey] = newKey;
    }
    static addUpdateExToResult(result, database, table, oldKey, row) {
        // console.log('Result.addUpdateExToResult');
        if (!result[database])
            result[database] = {};
        if (!result[database][table])
            result[database][table] = {};
        if (!result[database][table].updateEx)
            result[database][table].updateEx = {};
        result[database][table].updateEx[oldKey] = row;
    }
    static addDeleteToResult(result, database, table, key) {
        if (!result[database])
            result[database] = {};
        if (!result[database][table])
            result[database][table] = {};
        if (!result[database][table].delete)
            result[database][table].delete = [];
        result[database][table].delete.push(key);
    }
    static addTableToResult(result, database, table, value) {
        if (!result[database])
            result[database] = {};
        if (result[database][table])
            throw new Error(`table ${table} already exists`);
        result[database][table] = value;
    }
}
exports.Result = Result;
// export = Result;
