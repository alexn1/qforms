import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
export declare class BkColumn extends BkModel {
    fillAttributes(response: any): void;
    isKey(): boolean;
    isAuto(): boolean;
    getApp(): BkApplication;
}
