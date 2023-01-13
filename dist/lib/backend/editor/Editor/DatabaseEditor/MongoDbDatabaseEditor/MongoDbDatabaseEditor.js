"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbDatabaseEditor = void 0;
const DatabaseEditor_1 = require("../DatabaseEditor");
const Editor_1 = require("../../Editor");
class MongoDbDatabaseEditor extends DatabaseEditor_1.DatabaseEditor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'MongoDbDatabase',
            '@attributes': Object.assign({}, DatabaseEditor_1.DatabaseEditor.createAttributes(params)),
            params: [...(params.params ? params.params.map(Editor_1.Editor.createItemData) : [])],
        };
    }
}
exports.MongoDbDatabaseEditor = MongoDbDatabaseEditor;
