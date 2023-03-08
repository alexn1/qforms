"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const Helper_1 = require("../common/Helper");
class Search {
    static getObj() {
        if (typeof window !== 'object')
            return {};
        if (!window.location.search.split('?')[1])
            return {};
        return window.location.search
            .split('?')[1]
            .split('&')
            .reduce((acc, item) => {
            const kv = item.split('=');
            acc[kv[0]] = decodeURIComponent(kv[1]);
            return acc;
        }, {});
    }
    static objToString(obj) {
        const search = Object.keys(obj)
            .map((name) => `${name}=${encodeURIComponent(obj[name])}`)
            .join('&');
        if (!search)
            return '';
        return `?${search}`;
    }
    static filter(names) {
        const newObj = {};
        const obj = Search.getObj();
        for (const name of names) {
            if (obj.hasOwnProperty(name)) {
                newObj[name] = obj[name];
            }
        }
        return Search.objToString(newObj);
    }
}
exports.Search = Search;
Helper_1.Helper.registerGlobalClass(Search);
