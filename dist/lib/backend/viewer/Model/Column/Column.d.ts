import { Model } from '../Model';
import { BkApplication } from '../Application/Application';
export declare class BkColumn extends Model {
    fillAttributes(response: any): void;
    isKey(): boolean;
    isAuto(): boolean;
    getApp(): BkApplication;
}
