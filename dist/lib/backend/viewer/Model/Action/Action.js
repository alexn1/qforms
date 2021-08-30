"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Model_1 = __importDefault(require("../Model"));
class Action extends Model_1.default {
    static async create(data, parent) {
        return new Action(data, parent);
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}
module.exports = Action;
