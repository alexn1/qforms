"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const Model_1 = require("../Model");
const Helper_1 = require("../../../common/Helper");
class Column extends Model_1.Model {
    constructor(data, parent) {
        super(data, parent);
        if (!this.getAttr('type'))
            throw new Error(`column ${this.getFullName()}: no type`);
        if (!['string', 'number', 'boolean', 'object', 'date'].includes(this.getAttr('type'))) {
            throw new Error(`${this.getFullName()}: wrong column type: ${this.getAttr('type')}`);
        }
    }
    init() {
        // console.log('Column.init', this.getFullName());
    }
    getType() {
        return this.getAttr('type');
    }
}
exports.Column = Column;
Helper_1.Helper.registerGlobalClass(Column);
