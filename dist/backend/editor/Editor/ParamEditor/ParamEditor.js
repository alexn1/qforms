"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamEditor = void 0;
const Editor_1 = require("../Editor");
class ParamEditor extends Editor_1.Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'Param',
            '@attributes': {
                name: params.name,
                value: params.value || '',
            },
        };
    }
    getColName() {
        return 'params';
    }
}
exports.ParamEditor = ParamEditor;
