import { Model } from '../Model';
import { Application } from '../Application/Application';
export declare class Column extends Model {
    fillAttributes(response: any): void;
    isKey(): boolean;
    isAuto(): boolean;
    getApp(): Application;
}
