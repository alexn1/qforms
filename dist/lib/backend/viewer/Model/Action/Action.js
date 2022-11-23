"use strict";
const Model_1 = require("../Model");
class Action extends Model_1.Model {
    static async create(data, parent) {
        return new Action(data, parent);
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}
module.exports = Action;
