"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableEditor = void 0;
const Editor_1 = require("../Editor");
class TableEditor extends Editor_1.Editor {
    static createData(params) {
        // console.log('TableEditor.createData', params);
        return {
            '@class': 'Table',
            '@attributes': {
                name: params.name,
            },
            columns: [...(params.columns ? params.columns.map(Editor_1.Editor.createItemData) : [])],
        };
    }
    getColName() {
        return 'tables';
    }
}
exports.TableEditor = TableEditor;
