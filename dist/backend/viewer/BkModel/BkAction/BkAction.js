"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkAction = void 0;
const BkModel_1 = require("../BkModel");
class BkAction extends BkModel_1.BkModel {
    /* static async create(data, parent): Promise<Action> {
        return new Action(data, parent);
    } */
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}
exports.BkAction = BkAction;
