"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkColumn = void 0;
const Model_1 = require("../Model");
class BkColumn extends Model_1.BkModel {
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
exports.BkColumn = BkColumn;
