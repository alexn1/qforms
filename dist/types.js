"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyToKeyArray = exports.keyArrayToKey = void 0;
const keyArrayToKey = (keyArray) => {
    return JSON.stringify(keyArray);
};
exports.keyArrayToKey = keyArrayToKey;
const keyToKeyArray = (key) => {
    return JSON.parse(key);
};
exports.keyToKeyArray = keyToKeyArray;
