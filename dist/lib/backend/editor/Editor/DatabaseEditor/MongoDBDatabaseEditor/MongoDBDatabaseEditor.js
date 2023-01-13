"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBDatabaseEditor = void 0;
const DatabaseEditor_1 = require("../DatabaseEditor");
const Editor_1 = require("../../Editor");
class MongoDBDatabaseEditor extends DatabaseEditor_1.DatabaseEditor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'MongoDBDatabase',
            '@attributes': Object.assign({}, DatabaseEditor_1.DatabaseEditor.createAttributes(params)),
            params: [...(params.params ? params.params.map(Editor_1.Editor.createItemData) : [])],
        };
    }
}
exports.MongoDBDatabaseEditor = MongoDBDatabaseEditor;
