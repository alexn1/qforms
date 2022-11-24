"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseEditor = void 0;
const Editor = require('../Editor');
class DatabaseEditor extends Editor {
    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }
    getColName() {
        return 'databases';
    }
}
exports.DatabaseEditor = DatabaseEditor;
