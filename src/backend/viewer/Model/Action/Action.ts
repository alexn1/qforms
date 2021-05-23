// import Application from '../Application/Application';
const Model = require('../Model');

class Action extends Model {
    constructor(data: any, parent: any) {
        super(data, parent);
    }
    static async create(data, parent): Promise<Action> {
        return new Action(data, parent);
    }
    /*public getApp(): Application {
        if (this.parent instanceof Application) return this.parent;
        if (this.parent.parent instanceof Application) return this.parent.parent;
        if (this.parent.parent.parent instanceof Application) return this.parent.parent.parent;
    }*/
}

export = Action;
