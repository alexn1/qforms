const Model = require('../Model');

class Action extends Model {
    constructor(data: any, parent: any) {
        super(data, parent);
    }
    static async create(data, parent): Promise<Action> {
        return new Action(data, parent);
    }
}

module.exports = Action;
