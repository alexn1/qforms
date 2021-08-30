import Model from '../Model';
declare class Action extends Model {
    static create(data: any, parent: any): Promise<Action>;
    fillAttributes(response: any): void;
}
export = Action;
