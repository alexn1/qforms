import { Model } from '../Model';
export declare class Action extends Model {
    static create(data: any, parent: any): Promise<Action>;
    fillAttributes(response: any): void;
}
