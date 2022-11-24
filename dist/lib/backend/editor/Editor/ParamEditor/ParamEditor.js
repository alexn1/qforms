"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamEditor = void 0;
const Editor = require('../Editor');
class ParamEditor extends Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'Param',
            '@attributes': {
                name: params.name,
                value: params.value || ''
            }
        };
    }
    getColName() {
        return 'params';
    }
}
exports.ParamEditor = ParamEditor;
