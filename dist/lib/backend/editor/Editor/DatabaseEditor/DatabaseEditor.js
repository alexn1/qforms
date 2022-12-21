"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseEditor = void 0;
const Editor_1 = require("../Editor");
class DatabaseEditor extends Editor_1.Editor {
    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }
    static createAttributes(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            name: params.name,
            modelClass: params.modelClass !== undefined ? params.modelClass : '',
        };
    }
    getColName() {
        return 'databases';
    }
}
exports.DatabaseEditor = DatabaseEditor;
