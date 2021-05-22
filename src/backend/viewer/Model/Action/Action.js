const Model = require('../Model');

class Action extends Model {
    static async create(data, parent) {
        return new Action(data, parent);
    }
}

module.exports = Action;
