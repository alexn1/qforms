"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionEditor = void 0;
const Editor_1 = require("../Editor");
class ActionEditor extends Editor_1.Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'Action',
            '@attributes': {
                name: params.name,
                caption: params.caption || params.name,
            },
        };
    }
    getColName() {
        return 'actions';
    }
}
exports.ActionEditor = ActionEditor;
