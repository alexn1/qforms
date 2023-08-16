import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
import { ColumnScheme } from '../../../common/Scheme/ColumnScheme';
export declare class BkColumn extends BkModel<ColumnScheme> {
    fillAttributes(response: any): void;
    isKey(): boolean;
    isAuto(): boolean;
    getApp(): BkApplication;
}
