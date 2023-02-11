"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.DResult = exports.TResult = exports.UpdateEx = exports.Update = exports.InsertEx = void 0;
class InsertEx {
}
exports.InsertEx = InsertEx;
class Update {
}
exports.Update = Update;
class UpdateEx {
}
exports.UpdateEx = UpdateEx;
class TResult {
}
exports.TResult = TResult;
class DResult {
}
exports.DResult = DResult;
class Result {
    static addInsertToResult(result, dName, tName, key) {
        if (!result[dName])
            result[dName] = new DResult();
        if (!result[dName][tName])
            result[dName][tName] = new TResult();
        if (!result[dName][tName].insert)
            result[dName][tName].insert = [];
        result[dName][tName].insert.push(key);
    }
    static addInsertExToResult(result, dName, tName, key, row) {
        if (!result[dName])
            result[dName] = new DResult();
        if (!result[dName][tName])
            result[dName][tName] = new TResult();
        if (!result[dName][tName].insertEx)
            result[dName][tName].insertEx = new InsertEx();
        result[dName][tName].insertEx[key] = row;
    }
    static addUpdateToResult(result, dName, tName, oldKey, newKey) {
        // console.log('Result.addUpdateToResult');
        if (!result[dName])
            result[dName] = new DResult();
        if (!result[dName][tName])
            result[dName][tName] = new TResult();
        if (!result[dName][tName].update)
            result[dName][tName].update = new Update();
        result[dName][tName].update[oldKey] = newKey;
    }
    static addUpdateExToResult(result, dName, tName, oldKey, row) {
        // console.log('Result.addUpdateExToResult');
        if (!result[dName])
            result[dName] = new DResult();
        if (!result[dName][tName])
            result[dName][tName] = new TResult();
        if (!result[dName][tName].updateEx)
            result[dName][tName].updateEx = new UpdateEx();
        result[dName][tName].updateEx[oldKey] = row;
    }
    static addDeleteToResult(result, dName, tName, key) {
        if (!result[dName])
            result[dName] = new DResult();
        if (!result[dName][tName])
            result[dName][tName] = new TResult();
        if (!result[dName][tName].delete)
            result[dName][tName].delete = [];
        result[dName][tName].delete.push(key);
    }
    static addTableToResult(result, dName, tName, tResult) {
        if (!result[dName])
            result[dName] = {};
        if (result[dName][tName])
            throw new Error(`table ${tName} already exists`);
        result[dName][tName] = tResult;
    }
}
exports.Result = Result;
