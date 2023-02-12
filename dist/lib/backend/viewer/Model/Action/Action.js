"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkAction = void 0;
const Model_1 = require("../Model");
class BkAction extends Model_1.Model {
    /* static async create(data, parent): Promise<Action> {
        return new Action(data, parent);
    } */
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}
exports.BkAction = BkAction;
