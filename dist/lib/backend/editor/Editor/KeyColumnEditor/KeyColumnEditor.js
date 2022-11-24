"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyColumnEditor = void 0;
const Editor_1 = require("../Editor");
class KeyColumnEditor extends Editor_1.Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'KeyColumn',
            '@attributes': {
                'name': params.name
            }
        };
    }
    getColName() {
        return 'keyColumns';
    }
}
exports.KeyColumnEditor = KeyColumnEditor;
