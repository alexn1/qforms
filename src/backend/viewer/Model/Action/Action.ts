import Model from '../Model';

class Action extends Model {
    static async create(data, parent): Promise<Action> {
        return new Action(data, parent);
    }

    fillAttributes(response: any): void {
        response.name    = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}

export = Action;
