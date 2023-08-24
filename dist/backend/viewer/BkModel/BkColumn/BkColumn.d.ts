import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
import { ColumnScheme } from '../../../common/Scheme/ColumnScheme';
import { ColumnData } from '../../../../common/ModelData/ColumnData';
export declare class BkColumn extends BkModel<ColumnScheme> {
    fillAttributes(response: ColumnData): void;
    isKey(): boolean;
    isAuto(): boolean;
    getApp(): BkApplication;
}
