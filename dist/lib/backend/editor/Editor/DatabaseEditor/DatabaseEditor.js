"use strict";
const Editor = require('../Editor');
// const ParamEditor = require('../ParamEditor/ParamEditor');
// const TableEditor = require('../TableEditor/TableEditor');
class DatabaseEditor extends Editor {
    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }
}
module.exports = DatabaseEditor;
