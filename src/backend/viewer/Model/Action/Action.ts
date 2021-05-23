import Model from '../Model';

class Action extends Model {
    static async create(data, parent): Promise<Action> {
        return new Action(data, parent);
    }
}

export = Action;
