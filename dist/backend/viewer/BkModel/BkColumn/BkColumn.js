"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkColumn = void 0;
const BkModel_1 = require("../BkModel");
class BkColumn extends BkModel_1.BkModel {
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
        return this.getParent().getParent().getParent();
    }
}
exports.BkColumn = BkColumn;
