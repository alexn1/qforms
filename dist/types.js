"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyToKeyTuple = exports.keyTupleToKey = void 0;
const keyTupleToKey = (keyArray) => {
    return JSON.stringify(keyArray);
};
exports.keyTupleToKey = keyTupleToKey;
const keyToKeyTuple = (key) => {
    return JSON.parse(key);
};
exports.keyToKeyTuple = keyToKeyTuple;
