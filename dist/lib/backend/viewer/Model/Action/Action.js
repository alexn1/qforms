"use strict";
const Model = require("../Model");
class Action extends Model {
    static async create(data, parent) {
        return new Action(data, parent);
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}
module.exports = Action;
