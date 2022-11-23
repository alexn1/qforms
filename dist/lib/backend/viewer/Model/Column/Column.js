"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const Model_1 = require("../Model");
class Column extends Model_1.Model {
    // constructor(data, parent) {
    //     super(data, parent);
    //     // console.log('Column.constructor', this.getName());
    // }
    static async create(data, parent) {
        return new Column(data, parent);
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.type = this.getAttr('type');
    }
    isKey() {
        return this.getAttr('key') === 'true';
    }
    isAuto() {
        return this.getAttr('auto') === 'true';
    }
    getApp() {
        return this.parent.parent.parent;
    }
}
exports.Column = Column;
